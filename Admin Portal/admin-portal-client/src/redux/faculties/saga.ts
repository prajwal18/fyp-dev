import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateFaculties,
    updateDDFaculties,
    updateSearchTerm,
    updatePaginationData
} from "./faculties.slice";
// Action creators from slice

// selectors
import { selectSearchTerm, selectPaginationData } from "./faculties.slice"
// selectors

// Custom axios calls
import {
    httpGetAllFaculty,
    httpAddFaculty,
    httpUpdateFaculty,
    httpDeleteFaculty,
    httpGetDDFaculties
} from "../../services/faculty.service";
// Custom axios calls


const generateFetchQuery = (skip: number, take: number, searchTerm?: string) => {
    return `skip=${skip}&take=${take}&searchTerm=${searchTerm}`
}



// Generator Functions
// Fetch
function* fetchPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllFaculty(query));
    if (response) {
        // Dispatch faculty data to the store
        yield put(updatePaginationData({ ...pagination, total: response.total }));
    }
}

function* fetchDDFaculties(action: ActionType): Generator<any, any, any> {
    console.log('Hello am i being executed');
    const response = yield apiCallNResp(() => httpGetDDFaculties());
    console.log('All Faculties: ', response);
    if(response){
        yield put(updateDDFaculties(response.data));
    }
}

function* fetchFaculties(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllFaculty(query));
    if (response) {
        // Dispatch faculty data to the store
        yield put(updateFaculties(response.data));
    }

}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllFaculty(query));
    if (response) {
        yield setPaginationData({ type: action.type, payload: { skip: 0, take: 5, total: response.total } })
    }
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
    yield fetchFaculties(action);
}
// SET Pagination and search term

// Faculty operations
function* addFaculty(action: ActionType): Generator<any, any, any> {
    const newFaculty = action.payload;
    const response = yield apiCallNResp(() => httpAddFaculty(newFaculty));
    if (response) {
        toast.success(`${response.data?.name} added successfully.`);
        yield fetchPaginationData(action);
    }
    // fetch Faculties
}

function* updateFaculty(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpUpdateFaculty(id, data));
    if (response) {
        toast.success(`${response.data.name} updated successfully.`);
        yield fetchFaculties(action);
    }
    // fetchFaculties

}

function* deleteFaculty(action: ActionType): Generator<any, any, any> {
    const { id } = action.payload;
    const response = yield apiCallNResp(() => httpDeleteFaculty(id));
    if (response) {
        toast.success('Faculty deleted successfully.');
        yield fetchPaginationData(action);
    }
    // fetchFaculties
}
//Faculty Opeartions
// Generator Functions



function* FacultySaga() {
    yield takeEvery(actionTypes.FACULTY_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_DD_FACULTIES, fetchDDFaculties);
    yield takeEvery(actionTypes.FETCH_ALL_FACULTIES, fetchFaculties);

    yield takeEvery(actionTypes.FACULTY_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.FACULTY_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_FACULTY, addFaculty);
    yield takeEvery(actionTypes.UPDATE_FACULTY_DATA, updateFaculty);
    yield takeEvery(actionTypes.DELETE_FACULTY, deleteFaculty);

}

export default FacultySaga;