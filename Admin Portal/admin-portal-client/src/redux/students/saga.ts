import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateStudents,
    updateSearchTerm,
    updatePaginationData,
    updateSelectedStudent
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
    httpDeleteStudent,
    httpGetStudentDetail
} from "../../services/student.service";
import { selectSelectedCourse, selectSelectionPurpose } from "../courses/courses.slice";
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

function* fetchSelectedStudent(action: ActionType): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetStudentDetail(action.payload.id));
    if (response) {
        // Dispatch student data to the store
        yield put(updateSelectedStudent(response.data));
    }
}

function* fetchCourseStudent(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);

    if (selectedCourse?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllStudent(query));
        if (response) {
            yield put(updateStudents(response.data));
        }
    } else {
        yield put(updateStudents());
    }
}

function* fetchCourseStudentPagination(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);

    if (selectedCourse?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllStudent(query));
        if (response) {
            yield put(updatePaginationData({ ...pagination, total: response.total }));
        }
    } else {
        yield put(updatePaginationData({ ...pagination, skip: 0, take: 5, total: 0 })); // spread pagination cuz it was throwing some warning
    }
}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    const pagination = yield select(selectPaginationData);
    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllStudent(query));
    if (response) {
        yield setPaginationData({ type: action.type, payload: { ...pagination, skip: 0, total: response.total } })
    }
}
function* setSearchTermCourseStudent(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    const pagination = yield select(selectPaginationData);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);
    yield put(updateSearchTerm(searchTerm));

    if (selectedCourse && selectedCourse._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllStudent(query));
        if (response) {
            yield setPaginationData({ type: action.type, payload: { ...pagination, skip: 0, total: response.total } })
        }
    }
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
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
    yield takeEvery(actionTypes.FETCH_SELECTED_STUDENT, fetchSelectedStudent);
    yield takeEvery(actionTypes.FETCH_COURSE_STUDENT_PAGINATION, fetchCourseStudentPagination);
    yield takeEvery(actionTypes.FETCH_COURSE_STUDENT, fetchCourseStudent);

    yield takeEvery(actionTypes.STUDENT_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.COURSE_STUDENT_SET_SEARCH_TERM, setSearchTermCourseStudent);
    yield takeEvery(actionTypes.STUDENT_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_STUDENT, addStudent);
    yield takeEvery(actionTypes.UPDATE_STUDENT_DATA, updateStudent);
    yield takeEvery(actionTypes.DELETE_STUDENT, deleteStudent);

    yield takeEvery(actionTypes.CHANGE_STUDENT_PASSWORD, changePassword);

}

export default StudentSaga;