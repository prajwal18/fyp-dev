import { call, put, takeEvery, select } from "redux-saga/effects";
import Cookies from "universal-cookie";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updatePagination,
    selectPagination,
    selectSearchTerm,
    selectSearchParams,
    updateSelectedTest
} from './test.slice';
// Action creators from slice

// Custom axios calls
import { httpGetTest } from "@/service/test.service";
// Custom axios calls 

// Generator Functions
function* fetchSelectedTestPaper(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield apiCallNResp(() => httpGetTest(id));
    if(response?.success) {
        yield put(updateSelectedTest(response.data))
    }
}
// Generator Functions


function* TestSaga() {
    yield takeEvery(actionTypes.FETCH_SELECTED_TEST_PAPER, fetchSelectedTestPaper);
}

export default TestSaga;