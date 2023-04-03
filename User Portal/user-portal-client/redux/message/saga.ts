import { put, takeEvery, select } from "redux-saga/effects";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateUsers,
    updateConversation
} from './message.slice';
// Action creators from slice

// Custom axios calls
import {
    httpGetAllMembers
} from '@/service/user.service';
import { selectCourses, selectUser } from "../general/general.slice";
import { joinDDListValues } from "@/utils/filterFunctions";
import { UserTypes } from "@/constants/Constants";
import { httpGetConversation } from "@/service/conversation.service";
// Custom axios calls 

// Generator Functions
function* fetchAllCourseMembers(action: ActionT): Generator<any, any, any> {
    const user = yield select(selectUser)
    const courses = yield select(selectCourses);
    const courseIds = joinDDListValues(courses);
    const role = `${UserTypes.STUDENT},${UserTypes.TEACHER}`;

    const query = `?courseIds=${courseIds}&role=${role}&searchTerm=&skip=0&take=0`;
    const response = yield (apiCallNResp(() => httpGetAllMembers(query)));
    if (response?.success) {
        const allMembers = response.data.filter((member: any) => member._id !== user._id)
        yield put(updateUsers(allMembers));
    }
}
function* fetchConversation(action: ActionT): Generator<any, any, any> {
    const id = action.payload.id;
    const response = yield (apiCallNResp(() => httpGetConversation(id)));
    if (response?.success) {
        yield put(updateConversation(response.data));
    }
}
// Generator Functions


function* MessageSaga() {
    yield takeEvery(actionTypes.FETCH_ALL_COURSE_MEMBERS, fetchAllCourseMembers);
    yield takeEvery(actionTypes.FETCH_CONVERSATION, fetchConversation);
}

export default MessageSaga;