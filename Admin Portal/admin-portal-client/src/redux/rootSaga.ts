import { all } from "redux-saga/effects";

// importing all the sagas for different slices
import AdminSaga from "./admins/saga";
// importing all the sagas for different slices

export default function* rootSaga() {
    yield all([
        // Admins
        AdminSaga(),
        // Students

        // Teachers

        // Courses

        // Faculty
    ]);
}
