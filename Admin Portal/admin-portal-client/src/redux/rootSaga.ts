import { all } from "redux-saga/effects";

// importing all the sagas for different slices
import AdminSaga from "./admins/saga";
import CourseSaga from "./courses/saga";
import FacultySaga from "./faculties/saga";
import StudentSaga from "./students/saga";
import TeacherSaga from "./teachers/saga";
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([
        // Admins
        AdminSaga(),
        // Students
        StudentSaga(),

        // Teachers
        TeacherSaga(),

        // Courses
        CourseSaga(),

        // Faculty
        FacultySaga(),

        // General
    ]);
}
