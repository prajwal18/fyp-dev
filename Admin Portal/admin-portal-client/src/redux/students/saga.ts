import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateStudents,
    updateSearchTerm,
    updatePaginationData
} from "./students.slice";
// Action creators from slice

// selectors
import { selectSearchTerm, selectPaginationData } from "./students.slice"
// selectors

// Custom axios calls
import {
    httpGetAllStudent,
    httpAddStudent,
    httpUpdateStudent,
    httpChangePWStudent,
    httpDeleteStudent
} from "../../services/student.service";
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
    const response = yield apiCallNResp(() => httpGetAllStudent(query));
    if (response) {
        // Dispatch student data to the store
        yield put(updatePaginationData({ ...pagination, total: response.total }));
    }
}

function* fetchStudents(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllStudent(query));
    if (response) {
        // Dispatch student data to the store
        yield put(updateStudents(response.data));
    }

}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllStudent(query));
    if(response) {
        yield setPaginationData({type:action.type, payload: {skip:0, take: 5, total: response.total}})
    }
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
    yield fetchStudents(action);
}
// SET Pagination and search term

// Student operations
function* addStudent(action: ActionType): Generator<any, any, any> {
    const newStudent = action.payload;
    const response = yield apiCallNResp(() => httpAddStudent(newStudent));
    if (response) {
        toast.success(`${response.data.name} added successfully.`);
        yield fetchPaginationData(action);
    }
    // fetch Students
}

function* updateStudent(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpUpdateStudent(id, data));
    if (response) {
        toast.success(`${response.data.name} updated successfully.`);
        yield fetchStudents(action);
    }
    // fetchStudents

}

function* deleteStudent(action: ActionType): Generator<any, any, any> {
    const { id } = action.payload;
    const response = yield apiCallNResp(() => httpDeleteStudent(id));
    if (response) {
        toast.success('Student deleted successfully.');
        yield fetchPaginationData(action);
    }
    // fetchStudents
}

function* changePassword(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpChangePWStudent(id, data));
    if (response) {
        toast.success('Password changed successful.');
        yield fetchStudents(action);
    }
    // fetchStudents

}
//Student Opeartions
// Generator Functions




function* StudentSaga() {
    yield takeEvery(actionTypes.STUDENT_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_ALL_STUDENTS, fetchStudents);

    yield takeEvery(actionTypes.STUDENT_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.STUDENT_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_STUDENT, addStudent);
    yield takeEvery(actionTypes.UPDATE_STUDENT_DATA, updateStudent);
    yield takeEvery(actionTypes.DELETE_STUDENT, deleteStudent);

    yield takeEvery(actionTypes.CHANGE_STUDENT_PASSWORD, changePassword);

}

export default StudentSaga;