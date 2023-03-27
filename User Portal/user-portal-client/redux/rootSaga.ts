import { all } from "redux-saga/effects";

// importing all the sagas for different slices
import GeneralSaga from "./general/saga";
import PeopleSaga from "./people/saga";
import TestSaga from "./test/saga";
import AssignmentSaga from "./assignment/saga";
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([

        // Assignments
        AssignmentSaga(),

        // General
        GeneralSaga(),

        // Courses
        // CoursesSaga(),

        // People
        PeopleSaga(),

        // Test
        TestSaga()

    ]);
}
