import { all } from "redux-saga/effects";

// importing all the sagas for different slices
import GeneralSaga from "./general/saga";
import PeopleSaga from "./people/saga";
import TestSaga from "./test/saga";
import AssignmentSaga from "./assignment/saga";
import StatSaga from "./stat/saga";
import MessageSaga from "./message/saga";
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([

        // Assignments
        AssignmentSaga(),

        // General
        GeneralSaga(),

        // Message
        MessageSaga(),

        // People
        PeopleSaga(),

        // Test
        TestSaga(),

        // Statistics
        StatSaga()

    ]);
}
