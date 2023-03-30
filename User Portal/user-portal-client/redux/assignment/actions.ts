import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchSelectedAssignmentAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_ASSIGNMENT);

export const fetchSelectedSubmittedAssignmentAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_SUMBITTED_ASSIGNMENT);

export const fetchAllSpecificAssignmentsAC = createAction(actionTypes.FETCH_ALL_SPECIFIC_ASSIGNMENTS);

export const fetchPaginationDataAC = createAction(actionTypes.FETCH_PAGINATION_DATA_ASSIGNMENT);


// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }