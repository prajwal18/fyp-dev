import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateTeachers,
    updateSearchTerm,
    updatePaginationData,
    updateSelectedTeacher
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
    httpDeleteTeacher,
    httpGetTeacherDetail
} from "../../services/teacher.service";
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

function* fetchSelectedTeacher(action: ActionType): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetTeacherDetail(action.payload.id));
    if (response) {
        // Dispatch student data to the store
        yield put(updateSelectedTeacher(response.data));
    }
}

function* fetchCourseTeacher(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);

    if (selectedCourse?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllTeacher(query));
        if (response) {
            yield put(updateTeachers(response.data));
        }
    } else {
        yield put(updateTeachers());
    }
}

function* fetchCourseTeacherPagination(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);

    if (selectedCourse?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllTeacher(query));
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
    const response = yield apiCallNResp(() => httpGetAllTeacher(query));
    if (response) {
        yield setPaginationData({ type: action.type, payload: { ...pagination, skip: 0, total: response.total } })
    }
}
function* setSearchTermCourseTeacher(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    const pagination = yield select(selectPaginationData);
    const selectedCourse = yield select(selectSelectedCourse);
    const selectionPurpose = yield select(selectSelectionPurpose);
    yield put(updateSearchTerm(searchTerm));

    if (selectedCourse && selectedCourse._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&course=${selectedCourse._id}&purpose=${selectionPurpose}`;
        const response = yield apiCallNResp(() => httpGetAllTeacher(query));
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
    yield takeEvery(actionTypes.FETCH_SELECTED_TEACHER, fetchSelectedTeacher);
    yield takeEvery(actionTypes.FETCH_COURSE_TEACHER_PAGINATION, fetchCourseTeacherPagination);
    yield takeEvery(actionTypes.FETCH_COURSE_TEACHER, fetchCourseTeacher);

    yield takeEvery(actionTypes.TEACHER_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.COURSE_TEACHER_SET_SEARCH_TERM, setSearchTermCourseTeacher);
    yield takeEvery(actionTypes.TEACHER_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_TEACHER, addTeacher);
    yield takeEvery(actionTypes.UPDATE_TEACHER_DATA, updateTeacher);
    yield takeEvery(actionTypes.DELETE_TEACHER, deleteTeacher);

    yield takeEvery(actionTypes.CHANGE_TEACHER_PASSWORD, changePassword);

}

export default TeacherSaga;