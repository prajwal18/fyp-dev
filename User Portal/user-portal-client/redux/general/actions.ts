import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchUserAC = createAction(actionTypes.FETCH_USER_DETAILS);

export const updateSessionNTokenAC = createAction<{ id: string, role: string, email: string, token: string }>(actionTypes.UPDATE_SESSION_AND_TOKEN);

export const removeSessionNTokenAC = createAction(actionTypes.REMOVE_SESSION_AND_TOKEN);




// export const increment = createAction<number | undefined>('counter/increment')
// returns { type: 'counter/increment', payload: number }