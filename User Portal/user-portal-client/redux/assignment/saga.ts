import { call, put, takeEvery, select } from "redux-saga/effects";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateSelectedSubmittedAssignment,
    updateSelectedAssignment,
    selectSearchParams,
    selectPagination,
    selectSearchTerm,
    updatePagination,
    updateAllAssignemnts
} from './assignment.slice';
// Action creators from slice

// Custom axios calls
import { httpGetAssignment } from "@/service/assignment.service";
import { httpGetSubmittedAssignment, httpGetAllSpecificAssignment } from "@/service/assignment.submission.service";
// Custom axios calls 

// Generator Functions
function* fetchSelectedAssignment(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => httpGetAssignment(id));
    if(response?.success) {
        yield put(updateSelectedAssignment(response.data));
    }
}

function* fetchSelectedSubmittedAssignment(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => httpGetSubmittedAssignment(id));
    // Some more steps here
    if(response.success) {
        yield put(updateSelectedSubmittedAssignment(response.data))
    }
}

function* fetchPaginationData(action: ActionT): Generator<any, any, any> {
    const searchParams = yield select(selectSearchParams);
    const pagination = yield select(selectPagination);
    const searchTerm = yield select(selectSearchTerm);
    const query = `?courseIds=${searchParams.courses}&type=${searchParams.assignmentType}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=0`;
    const response = yield apiCallNResp(() => httpGetAllSpecificAssignment(query));
    // Some more steps here
    if (response.success) {
        yield put(updatePagination({...pagination, total: response.hits}))
    }
}

function* fetchAllSpecificAssignments(action: ActionT): Generator<any, any, any> {
    const searchParams = yield select(selectSearchParams);
    const searchTerm = yield select(selectSearchTerm);
    const pagination = yield select(selectPagination);
    const query = `?courseIds=${searchParams.courses}&type=${searchParams.assignmentType}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=${pagination.take}`;
    const response = yield apiCallNResp(() => httpGetAllSpecificAssignment(query));
    // Some more steps here
    if (response.success) {
        yield put(updateAllAssignemnts(response.data))
    }
}
// Generator Functions


function* AssignmentSaga() {
    yield takeEvery(actionTypes.FETCH_SELECTED_ASSIGNMENT, fetchSelectedAssignment);
    yield takeEvery(actionTypes.FETCH_SELECTED_SUMBITTED_ASSIGNMENT, fetchSelectedSubmittedAssignment);
    yield takeEvery(actionTypes.FETCH_ALL_SPECIFIC_ASSIGNMENTS, fetchAllSpecificAssignments);
    yield takeEvery(actionTypes.FETCH_PAGINATION_DATA_ASSIGNMENT, fetchPaginationData);
}

export default AssignmentSaga;