import { createSlice } from '@reduxjs/toolkit';

// Initial state for assignment slice
import { AssignmentIS, AssignmentIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for assignment slice

// Creating the assignment slice
const options = {
    name: 'assignment',
    initialState: AssignmentIS,
    reducers: {
        updateSelectedAssignment: (state: AssignmentIST, action: ActionT) => {
            return { ...state, selectedAssignment: action.payload }
        },
        updateSelectedSubmittedAssignment: (state: AssignmentIST, action: ActionT) => {
            return { ...state, selectedSubmittedAssignment: action.payload }
        },
        updateSearchTerm: (state: AssignmentIST, action: ActionT) => {
            return { ...state, searchTerm: action.payload }
        },
        updatePagination: (state: AssignmentIST, action: ActionT) => {
            return { ...state, pagination: action.payload }
        },
        updateSearchParams: (state: AssignmentIST, action: ActionT) => {
            return { ...state, searchParams: action.payload }
        },
        resetState: (state: AssignmentIST, action: ActionT) => {
            return AssignmentIS
        }
    }
}
// Creating the slice
export const assignmentSlice = createSlice(options);
// Creating the assignment slice

// Selector functions
export const selectSelectedAssignment = (state: any) => {
    return state.assignment.selectedAssignment;
}
export const selectSelectedSubmittedAssignment = (state: any) => {
    return state.assignment.selectedSubmittedAssignment;
}
export const selectSearchTerm = (state: any) => {
    return state.assignment.searchTerm;
}
export const selectPagination = (state: any) => {
    return state.assignment.pagination;
}
export const selectSearchParams = (state: any) => {
    return state.assignment.searchParams;
}
// Selector functions


// Exporting the action creator functions
export const {
    updateSelectedAssignment, updateSearchTerm,
    updatePagination, updateSearchParams,
    resetState, updateSelectedSubmittedAssignment
} = assignmentSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default assignmentSlice.reducer;
// Exporting the reducer as the default export