import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchSelectedTestPaperAC = createAction<{id: string}>(actionTypes.FETCH_SELECTED_TEST_PAPER);

// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }