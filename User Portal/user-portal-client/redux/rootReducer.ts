import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import GeneralReducer from '@/redux/general/general.slice';
import PeopleReducer from '@/redux/people/people.slice';
import TestReducer from '@/redux/test/test.slice';
// Importing all the reducers

const rootReducer = combineReducers({

    // Assignments
    // assignments: AssignmentReducer,

    // General
    general: GeneralReducer,

    // Courses
    // courses: CourseReducer,

    // People
    people: PeopleReducer,

    // Test
    test: TestReducer


});

export default rootReducer;