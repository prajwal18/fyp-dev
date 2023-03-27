import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchSelectedTestPaperAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_ASSIGNMENT);

export const fetchSelectedAnswerPaperAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_SUMBITTED_ASSIGNMENT);

// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }