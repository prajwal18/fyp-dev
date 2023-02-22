import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateTeachers,
    updateSearchTerm,
    updatePaginationData
} from "./teachers.slice";
// Action creators from slice

// selectors
import { selectSearchTerm, selectPaginationData } from "./teachers.slice"
// selectors

// Custom axios calls
import {
    httpGetAllTeacher,
    httpAddTeacher,
    httpUpdateTeacher,
    httpChangePWTeacher,
    httpDeleteTeacher
} from "../../services/teacher.service";
// Custom axios calls


const generateFetchQuery = (skip: number, take: number, searchTerm: string) => {
        return `skip=${skip}&take=${take}&searchTerm=${searchTerm}`
}



// Generator Functions
// Fetch
function* fetchPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllTeacher(query));
    if (response) {
        // Dispatch teacher data to the store
        yield put(updatePaginationData({ ...pagination, total: response.total }));
    }
}

function* fetchTeachers(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllTeacher(query));
    if (response) {
        // Dispatch teacher data to the store
        yield put(updateTeachers(response.data));
    }

}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllTeacher(query));
    if(response) {
        yield setPaginationData({type:action.type, payload: {skip:0, take: 5, total: response.total}})
    }
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
    yield fetchTeachers(action);
}
// SET Pagination and search term

// Teacher operations
function* addTeacher(action: ActionType): Generator<any, any, any> {
    const newTeacher = action.payload;
    const response = yield apiCallNResp(() => httpAddTeacher(newTeacher));
    if (response) {
        toast.success(`${response.data.name} added successfully.`);
        yield fetchPaginationData(action);
    }
    // fetch Teachers
}

function* updateTeacher(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpUpdateTeacher(id, data));
    if (response) {
        toast.success(`${response.data.name} updated successfully.`);
        yield fetchTeachers(action);
    }
    // fetchTeachers

}

function* deleteTeacher(action: ActionType): Generator<any, any, any> {
    const { id } = action.payload;
    const response = yield apiCallNResp(() => httpDeleteTeacher(id));
    if (response) {
        toast.success('Teacher deleted successfully.');
        yield fetchPaginationData(action);
    }
    // fetchTeachers
}

function* changePassword(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpChangePWTeacher(id, data));
    if (response) {
        toast.success('Password changed successful.');
        yield fetchTeachers(action);
    }
    // fetchTeachers

}
//Teacher Opeartions
// Generator Functions




function* TeacherSaga() {
    yield takeEvery(actionTypes.TEACHER_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_ALL_TEACHERS, fetchTeachers);

    yield takeEvery(actionTypes.TEACHER_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.TEACHER_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_TEACHER, addTeacher);
    yield takeEvery(actionTypes.UPDATE_TEACHER_DATA, updateTeacher);
    yield takeEvery(actionTypes.DELETE_TEACHER, deleteTeacher);

    yield takeEvery(actionTypes.CHANGE_TEACHER_PASSWORD, changePassword);

}

export default TeacherSaga;