import { call, put, takeEvery, select } from "redux-saga/effects";
import Cookies from "universal-cookie";

import { actionTypes } from "./types";
import { apiCallNResp, axiosWithToken } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    selectPagination,
    selectSearchParams,
    selectSearchTerm,
    updateAllTests,
    updatePagination,
    updateSelectedAnswerPaper,
    updateSelectedTest
} from './test.slice';
// Action creators from slice

// Custom axios calls
import { httpGetTest } from "@/service/test.service";
import { httpGetAllSpecificTest, httpGetTestAnswer } from "@/service/test.answer.service";
// Custom axios calls 

// Generator Functions
function* fetchSelectedTestPaper(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => httpGetTest(id));
    if (response?.success) {
        yield put(updateSelectedTest(response.data))
    }
}

function* fetchSelectedAnswerPaper(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => httpGetTestAnswer(id));
    // Some more steps here
    if (response.success) {
        yield put(updateSelectedAnswerPaper(response.data));
    }
}

function* fetchPaginationData(action: ActionT): Generator<any, any, any> {
    const searchParams = yield select(selectSearchParams);
    const pagination = yield select(selectPagination);
    const searchTerm = yield select(selectSearchTerm);
    const query = `?courseIds=${searchParams.courses}&type=${searchParams.testType}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=0`;
    const response = yield apiCallNResp(() => httpGetAllSpecificTest(query));
    // Some more steps here
    if (response.success) {
        yield put(updatePagination({...pagination, total: response.hits}))
    }
}

function* fetchAllSpecificTests(action: ActionT): Generator<any, any, any> {
    const searchParams = yield select(selectSearchParams);
    const searchTerm = yield select(selectSearchTerm);
    const pagination = yield select(selectPagination);
    const query = `?courseIds=${searchParams.courses}&type=${searchParams.testType}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=${pagination.take}`;
    const response = yield apiCallNResp(() => httpGetAllSpecificTest(query));
    // Some more steps here
    if (response.success) {
        yield put(updateAllTests(response.data))
    }
}
// Generator Functions


function* TestSaga() {
    yield takeEvery(actionTypes.FETCH_SELECTED_TEST_PAPER, fetchSelectedTestPaper);
    yield takeEvery(actionTypes.FETCH_SELECTED_ANSWER_PAPER, fetchSelectedAnswerPaper);
    yield takeEvery(actionTypes.FETCH_ALL_SPECIFIC_TESTS, fetchAllSpecificTests);
    yield takeEvery(actionTypes.FETCH_PAGINATION_DATA_TEST, fetchPaginationData);
}

export default TestSaga;