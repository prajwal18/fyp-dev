import { combineReducers } from "@reduxjs/toolkit";
// Importing all the reducers
import GeneralReducer from '@/redux/general/general.slice';
import PeopleReducer from '@/redux/people/people.slice';
import TestReducer from '@/redux/test/test.slice';
import AssignmentReducer from '@/redux/assignment/assignment.slice';
import StatReducer from '@/redux/stat/stat.slice';
import MessageReducer from '@/redux/message/message.slice';
// Importing all the reducers
const rootReducer = combineReducers({
    // Assignments
    assignment: AssignmentReducer,
    // General
    general: GeneralReducer,
    // Message
    message: MessageReducer,
    // People
    people: PeopleReducer,
    // Test
    test: TestReducer,
    // Statistics
    stat: StatReducer

});

export default rootReducer;