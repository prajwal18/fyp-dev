import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchAllMembersAC = createAction(actionTypes.FETCH_ALL_MEMBERS);

export const fetchPaginationDataAC = createAction(actionTypes.FETCH_PAGINATION_DATA);


// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }