import { createAction } from '@reduxjs/toolkit';

// Import action type
import { actionTypes } from './types';
// Import action type

export const fetchAllCourseMembersAC = createAction(actionTypes.FETCH_ALL_COURSE_MEMBERS);

export const fetchConversationAC = createAction<{id: string}>(actionTypes.FETCH_CONVERSATION);
