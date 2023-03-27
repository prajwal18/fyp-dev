import { call, put, takeEvery, select } from "redux-saga/effects";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateSelectedSubmittedAssignment,
    updateSelectedAssignment
} from './assignment.slice';
// Action creators from slice

// Custom axios calls
// Custom axios calls 

// Generator Functions
function* fetchSelectedAssignment(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => {});
    if(response?.success) {
        yield put(updateSelectedAssignment(response.data))
    }
}

function* fetchSelectedSubmittedAssignment(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => {});
    // Some more steps here
    if(response.success) {
        yield put(updateSelectedSubmittedAssignment(response.data))
    }
}
// Generator Functions


function* AssignmentSaga() {
    yield takeEvery(actionTypes.FETCH_SELECTED_ASSIGNMENT, fetchSelectedAssignment);
    yield takeEvery(actionTypes.FETCH_SELECTED_SUMBITTED_ASSIGNMENT, fetchSelectedSubmittedAssignment);
}

export default AssignmentSaga;