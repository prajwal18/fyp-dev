import { put, takeEvery, select } from "redux-saga/effects";

import { actionTypes } from "./types";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { ActionT } from "@/constants/CustomTypes";

// Action creators from slice
import {
    updateHeadInfo,
    updateCourseStat,
    updateAssignmentStat,
    updateTestStat,
    updateStudents,
    selectSearchParam,
    selectTestProgress,
    selectAssignmentProgress,
    updateTestData,
    updateAssignmentData
} from './stat.slice';
// Action creators from slice

// Custom axios calls
import {
    httpGetAssignmentProgress,
    httpGetAssignmentStat,
    httpGetCourseStat,
    httpGetHeadInfo,
    httpGetTestProgress,
    httpGetTestStat
} from "@/service/stats.service";
import { selectCourses } from "../general/general.slice";
import { joinDDListValues } from "@/utils/filterFunctions";
import { httpGetAllMembers } from "@/service/user.service";
// Custom axios calls 

// Generator Functions
function* fetchHeadInfo(action: ActionT): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetHeadInfo());
    if (response.success) {
        yield put(updateHeadInfo(response.data));
    }
}
function* fetchCourseStat(action: ActionT): Generator<any, any, any> {
    const response = yield apiCallNResp(() => httpGetCourseStat());
    if (response.success) {
        yield put(updateCourseStat(response.data));
    }
}
function* fetchAssignmentStat(action: ActionT): Generator<any, any, any> {
    const { assignmentCourses } = yield select(selectSearchParam);
    const response = yield apiCallNResp(() => httpGetAssignmentStat(assignmentCourses));
    if (response.success) {
        yield put(updateAssignmentStat(response.data));
    }
}
function* fetchTestStat(action: ActionT): Generator<any, any, any> {
    const { testCourses } = yield select(selectSearchParam);
    const response = yield apiCallNResp(() => httpGetTestStat(testCourses));
    if (response.success) {
        yield put(updateTestStat(response.data));
    }
}
function* updateStudentData(action: ActionT): Generator<any, any, any> {
    const rawData = action.payload;
    const students = rawData.map((item:any) => {
        return {name: item.name, value: item._id}
    });
    yield put(updateStudents(students));
}
function* fetchStudents(action: ActionT): Generator<any, any, any> {
    const courses = yield select(selectCourses);
    const courseIds = joinDDListValues(courses);
    const query = `?courseIds=${courseIds}&role=Student&searchTerm=&skip=0&take=0`;
    const response = yield (apiCallNResp(() => httpGetAllMembers(query)));
    if(response.success){
        yield updateStudentData({type: action.type, payload: response.data})
    }
}
function* fetchTestProgressData(action: ActionT): Generator<any, any, any> {
    const testProgress = yield select(selectTestProgress);
    const query = `?courseIds=${testProgress.courses}&studentIds=${testProgress.students}&take=${testProgress.take}`;
    const response = yield (apiCallNResp(() => httpGetTestProgress(query)));
    if(response.success){
        yield put(updateTestData(response.data));
    }
}
function* fetchAssignmentProgressData(action: ActionT): Generator<any, any, any> {
    const assignmentProgress = yield select(selectAssignmentProgress);
    const query = `?courseIds=${assignmentProgress.courses}&studentIds=${assignmentProgress.students}&take=${assignmentProgress.take}`;
    const response = yield (apiCallNResp(() => httpGetAssignmentProgress(query)));
    if(response.success){
        yield put(updateAssignmentData(response.data));
    }
}
// Generator Functions


function* StatSaga() {
    yield takeEvery(actionTypes.FETCH_HEAD_INFO, fetchHeadInfo);

    yield takeEvery(actionTypes.FETCH_COURSE_STAT, fetchCourseStat);
    yield takeEvery(actionTypes.FETCH_ASSIGNMENT_STAT, fetchAssignmentStat);
    yield takeEvery(actionTypes.FETCH_TEST_STAT, fetchTestStat);

    yield takeEvery(actionTypes.FETCH_TEST_PROGRESS_DATA, fetchTestProgressData);
    yield takeEvery(actionTypes.FETCH_ASSIGNMENT_PROGRESS_DATA, fetchAssignmentProgressData);

    yield takeEvery(actionTypes.FETCH_STUDENTS, fetchStudents);
}

export default StatSaga;