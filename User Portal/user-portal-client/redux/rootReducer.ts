import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import GeneralReducer from '@/redux/general/general.slice';
import PeopleReducer from '@/redux/people/people.slice';
import TestReducer from '@/redux/test/test.slice';
import AssignmentReducer from '@/redux/assignment/assignment.slice'
// Importing all the reducers

const rootReducer = combineReducers({

    // Assignments
    assignment: AssignmentReducer,

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