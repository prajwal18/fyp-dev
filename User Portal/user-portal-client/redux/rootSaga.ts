import { all } from "redux-saga/effects";

// importing all the sagas for different slices
import GeneralSaga from "./general/saga";
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([

        // Assignments
        // AssignmentSaga(),

        // General
        GeneralSaga(),

        // Courses
        // CoursesSaga(),

    ]);
}
