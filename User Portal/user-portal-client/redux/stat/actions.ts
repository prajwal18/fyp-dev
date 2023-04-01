import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchHeadInfoAC = createAction(actionTypes.FETCH_ASSIGNMENT_STAT);

export const fetchCourseStatAC = createAction(actionTypes.FETCH_COURSE_STAT);
export const fetchAssignmentStatAC = createAction(actionTypes.FETCH_ASSIGNMENT_STAT);
export const fetchTestStatAC = createAction(actionTypes.FETCH_TEST_STAT);

export const fetchTestProgressDataAC = createAction(actionTypes.FETCH_TEST_PROGRESS_DATA);
export const fetchAssignmentProgressDataAC = createAction(actionTypes.FETCH_ASSIGNMENT_PROGRESS_DATA);

export const fetchStudentsAC = createAction(actionTypes.FETCH_STUDENTS);