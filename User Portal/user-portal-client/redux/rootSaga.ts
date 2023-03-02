import { all } from "redux-saga/effects";

// importing all the sagas for different slices
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([
        // Admins
        // AdminSaga(),
        // Students
        // StudentSaga(),

        // Teachers
        // TeacherSaga(),

        // Courses
        // CourseSaga(),

        // Faculty
        // FacultySaga()
    ]);
}
