import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateCourses,
    updateSearchTerm,
    updatePaginationData,
    updateSelectedCourse,
    updateSelectedPurpose,
    selectSelectedCourse
} from "./courses.slice";
// Action creators from slice

// selectors
import { selectSearchTerm, selectPaginationData } from "./courses.slice"
// selectors

// Custom axios calls
import {
    httpAddCourse,
    httpGetAllCourse,
    httpUpdateCourse,
    httpDeleteCourse,
    httpGetCourseDetail,
    httpGetFacultyCourses,
    httpAddUserToCourse,
    httpRemoveUserFromCourse
} from "../../services/course.service";
import { selectSelectedFaculty } from "../faculties/faculties.slice";
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
    const response = yield apiCallNResp(() => httpGetAllCourse(query));
    if (response) {
        // Dispatch course data to the store
        yield put(updatePaginationData({ ...pagination, total: response.total }));
    }
}

function* fetchCourses(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllCourse(query));
    if (response) {
        // Dispatch course data to the store
        yield put(updateCourses(response.data));
    }
}

function* fetchFacultyCourses(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedFaculty = yield select(selectSelectedFaculty);
    if (selectedFaculty?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&facultyId=${selectedFaculty._id}`;
        const response = yield apiCallNResp(() => httpGetFacultyCourses(query));
        if (response) {
            yield put(updateCourses(response.data));
        }
    } else {
        yield put(updateCourses());
    }
}

function* fetchSelectedCourse(action: ActionType): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetCourseDetail(action.payload.id));
    if (response) {
        // Dispatch selected course data to the store
        yield put(updateSelectedCourse(response.data));
    }
}

function* fetchFacultyCoursePagination(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);
    const selectedFaculty = yield select(selectSelectedFaculty);

    if (selectedFaculty?._id) {
        const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm) + `&facultyId=${selectedFaculty._id}`;
        const response = yield apiCallNResp(() => httpGetFacultyCourses(query));
        if (response) {
            yield put(updatePaginationData({ ...pagination, total: response.total }));
        }
    } else {
        yield put(updatePaginationData({ ...pagination, skip: 0, total: 0 })); // spread pagination cuz it was throwing some warning
    }
}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    const pagination = yield select(selectPaginationData);

    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllCourse(query));
    if (response) {
        yield setPaginationData({ type: action.type, payload: { ...pagination, skip: 0, total: response.total } })
    }
}
function* setSearchTermFacultyCourse(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    const selectedFaculty = yield select(selectSelectedFaculty);
    const pagination = yield select(selectPaginationData);
    yield put(updateSearchTerm(searchTerm));

    if (selectedFaculty && selectedFaculty._id) {
        const query = generateFetchQuery(0, 0, searchTerm) + `&facultyId=${selectedFaculty._id}`;
        const response = yield apiCallNResp(() => httpGetFacultyCourses(query));
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

// Course operations
function* addCourse(action: ActionType): Generator<any, any, any> {
    const newCourse = action.payload;
    const response = yield apiCallNResp(() => httpAddCourse(newCourse));
    if (response) {
        toast.success(`${response.data.name} added successfully.`);
        yield fetchPaginationData(action);
    }
    // fetch Courses
}

function* updateCourse(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpUpdateCourse(id, data));
    if (response) {
        toast.success(`${response.data.name} updated successfully.`);
        yield fetchCourses(action);
    }
    // fetchCourses

}

function* deleteCourse(action: ActionType): Generator<any, any, any> {
    const { id } = action.payload;
    const response = yield apiCallNResp(() => httpDeleteCourse(id));
    if (response) {
        toast.success('Course deleted successfully.');
        yield fetchPaginationData(action);
    }
    // fetchCourses
}
//Course Opeartions
// Generator Functions


function* updateSelectionPurpose(action: ActionType): Generator<any, any, any> {
    yield put(updateSelectedPurpose(action.payload.data));
}


// ADD and REMOVE user from courses
function* addUserToCourse(action: ActionType): Generator<any, any, any> {
    const course = yield select(selectSelectedCourse);
    const { id, role } = action.payload;
    const response = yield apiCallNResp(() => httpAddUserToCourse(id, course._id, role));
    if(response){
        toast.success(`${role} added successfully to ${course.name}`);
    }
}
function* removeUserFromCourse(action: ActionType): Generator<any, any, any> {
    const course = yield select(selectSelectedCourse);
    const { id, role } = action.payload;
    const response = yield apiCallNResp(() => httpRemoveUserFromCourse(id, course._id, role));
    if(response){
        toast.success(`${role} removed successfully from ${course.name}`);
    }
}
// ADD and REMOVE user from courses


function* CourseSaga() {
    yield takeEvery(actionTypes.COURSE_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_ALL_COURSES, fetchCourses);
    yield takeEvery(actionTypes.FETCH_SELECTED_COURSE, fetchSelectedCourse);
    yield takeEvery(actionTypes.FETCH_FACULTY_COURSE_PAGINATION, fetchFacultyCoursePagination);
    yield takeEvery(actionTypes.FETCH_FACULTY_COURSES, fetchFacultyCourses);

    yield takeEvery(actionTypes.COURSE_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.FACULTY_COURSE_SET_SEARCH_TERM, setSearchTermFacultyCourse);
    yield takeEvery(actionTypes.COURSE_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_COURSE, addCourse);
    yield takeEvery(actionTypes.UPDATE_COURSE_DATA, updateCourse);
    yield takeEvery(actionTypes.DELETE_COURSE, deleteCourse);

    yield takeEvery(actionTypes.UPDATE_SELECTION_PURPOSE, updateSelectionPurpose);

    yield takeEvery(actionTypes.ADD_USER_TO_COURSE, addUserToCourse);
    yield takeEvery(actionTypes.REMOVE_USER_FROM_COURSE, removeUserFromCourse);

}

export default CourseSaga;