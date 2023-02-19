import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import adminReducer from "./admins/admins.slice";
import courseReducer from "./courses/courses.slice";
import facultyReducer from "./faculties/faculties.slice";
import studentReducer from "./students/students.slice";
import teacherReducer from "./teachers/teachers.slice";
// Importing all the reducers

const rootReducer = combineReducers({
    // admin
    admins: adminReducer,
    // courses
    courses: courseReducer,
    // faculty
    faculties: facultyReducer,
    // student
    students: studentReducer,
    // teacher
    teachers: teacherReducer
});

export default rootReducer;