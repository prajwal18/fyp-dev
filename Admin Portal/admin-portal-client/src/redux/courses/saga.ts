import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateCourses,
    updateSearchTerm,
    updatePaginationData
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
    httpDeleteCourse
} from "../../services/course.service";
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
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    yield put(updateSearchTerm(searchTerm));
    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllCourse(query));
    if(response) {
        yield setPaginationData({type:action.type, payload: {skip:0, take: 5, total: response.total}})
    }
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
    yield fetchCourses(action);
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




function* CourseSaga() {
    yield takeEvery(actionTypes.COURSE_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_ALL_COURSES, fetchCourses);

    yield takeEvery(actionTypes.COURSE_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.COURSE_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_COURSE, addCourse);
    yield takeEvery(actionTypes.UPDATE_COURSE_DATA, updateCourse);
    yield takeEvery(actionTypes.DELETE_COURSE, deleteCourse);

}

export default CourseSaga;