import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import GeneralReducer from '@/redux/general/general.slice';
// Importing all the reducers

const rootReducer = combineReducers({

    // Assignments
    // assignments: AssignmentReducer,

    // General
    general: GeneralReducer,

    // Courses
    // courses: CourseReducer,


});

export default rootReducer;