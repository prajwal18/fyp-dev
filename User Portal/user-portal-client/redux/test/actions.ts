import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchSelectedTestPaperAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_TEST_PAPER);

export const fetchSelectedAnswerPaperAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_ANSWER_PAPER);

export const fetchAllSpecificTestsAC = createAction(actionTypes.FETCH_ALL_SPECIFIC_TESTS);

export const fetchPaginationDataAC = createAction(actionTypes.FETCH_PAGINATION_DATA_TEST);

// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }