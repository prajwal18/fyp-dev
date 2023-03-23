import { call, put, takeEvery, select } from "redux-saga/effects";
import Cookies from "universal-cookie";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateMembers,
    updatePagination,
    selectPagination,
    selectSearchTerm,
    selectSearchParams
} from './people.slice';
// Action creators from slice

// Custom axios calls
import {
    httpGetAllMembers
} from '@/service/user.service';
// Custom axios calls 

// Generator Functions
function* fetchPaginationData(action: ActionT): Generator<any, any, any> {
    const pagination = yield select(selectPagination);
    const searchTerm = yield select(selectSearchTerm);
    const { courses, role } = yield select(selectSearchParams);

    const query = `?courseIds=${courses}&role=${role}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=${pagination.take}`;
    const response = yield(apiCallNResp(() => httpGetAllMembers(query)));
    if(response?.success) {
        yield put(updatePagination({skip:0, take: pagination.take, total: response.hits}));
    }
}
function* fetchAllMembers(action: ActionT):Generator<any, any, any> {
    const pagination = yield select(selectPagination);
    const searchTerm = yield select(selectSearchTerm);
    const { courses, role } = yield select(selectSearchParams);

    const query = `?courseIds=${courses}&role=${role}&searchTerm=${searchTerm}&skip=${pagination.skip}&take=${pagination.take}`;
    const response = yield(apiCallNResp(() => httpGetAllMembers(query)));
    if(response?.success) {
        yield put(updateMembers(response.data));
    }
}
// Generator Functions


function* PeopleSaga() {
    yield takeEvery(actionTypes.FETCH_ALL_MEMBERS, fetchAllMembers);
    yield takeEvery(actionTypes.FETCH_PAGINATION_DATA, fetchPaginationData);
}

export default PeopleSaga;