import { call, put, takeEvery, select } from "redux-saga/effects";
import Cookies from "universal-cookie";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateUser,
    updateCourses
} from './general.slice';
// Action creators from slice

// Custom axios calls
import {
    httpGetUserDetails
} from '@/service/user.service';
// Custom axios calls 

// Generator Functions
function* updateUserCourses(action: ActionT): Generator<any, any, any> {
    const rawCourses = action.payload;
    const courses = rawCourses.map((item: any) => {
        return {name: item.name, value: item._id}
    });
    yield put(updateCourses(courses));
}

function* fetchUserUpdateState(action: ActionT): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetUserDetails(action.payload));
    if (response && response.success) {
        yield put(updateUser(response.data));
        yield updateUserCourses({type: action.type, payload: response.data.courses});
    }
}

function* fetchUserDetails(action: ActionT): Generator<any, any, any> {
    const cookies = new Cookies();
    const session = cookies.get('user_session');
    if (session && session.id) {
        yield fetchUserUpdateState({ type: action.type, payload: session.id });
    }
}

function* updateSessionNToken(action: ActionT): Generator<any, any, any> {
    const cookies = new Cookies();
    const session = { id: action.payload.id, role: action.payload.role, email: action.payload.email };
    const token = action.payload.token;

    cookies.set('user_token', token, { path: '/' });
    cookies.set('user_session', session, { path: '/' });
}

function* removeSessionNToken(action: ActionT):Generator<any, any, any> {
    const cookies = new Cookies();
    cookies.remove('user_token', { path: '/' });
    cookies.remove('user_session', { path: '/' });
}
// Generator Functions


function* GeneralSaga() {
    yield takeEvery(actionTypes.FETCH_USER_DETAILS, fetchUserDetails);
    yield takeEvery(actionTypes.UPDATE_SESSION_AND_TOKEN, updateSessionNToken);
    yield takeEvery(actionTypes.REMOVE_SESSION_AND_TOKEN, removeSessionNToken);
}

export default GeneralSaga;