import { createSlice } from '@reduxjs/toolkit';

// Initial state for teachers slice
import { TeachersIS } from '../../constants/InitialStates';
import { ActionType, TeachersISType } from '../../constants/CustomTypes';
// Initial state for teachers slice

// Creating the teacher slice
const options = {
    name: 'teachers',
    initialState: TeachersIS,
    reducers: {
        updateTeachers: (state: TeachersISType, action: ActionType) => {
            return { ...state, teachers: action.payload }
        },
        updateSelectedTeacher: (state: TeachersISType, action: ActionType) => {
            return { ...state, selectedTeacher: action.payload }
        },
        updateSearchTerm: (state: TeachersISType, action: ActionType) => {
            return { ...state, searchTerm: action.payload }
        },
        updatePaginationData: (state: TeachersISType, action: ActionType) => {
            return { ...state, pagination: action.payload }
        },
        resetState: (state: TeachersISType, action: ActionType) => {
            return TeachersIS
        }
    }
}
// Creating the slice
export const teachersSlice = createSlice(options);
// Creating the admin slice

// Selector functions
export const selectSearchTerm = (state: any) => {
    return state.teachers.searchTerm;
}
export const selectPaginationData = (state: any) => {
    return state.teachers.pagination;
}
export const selectAllTeachers = (state: any) => {
    return state.teachers.teachers;
}
export const selectSelectedTeacher = (state: any) => {
    return state.teachers.selectedTeacher;
}
// Selector functions


// Exporting the action creator functions
export const { 
    updateTeachers, updateSearchTerm,
    updatePaginationData, updateSelectedTeacher,
    resetState
} = teachersSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default teachersSlice.reducer;
// Exporting the reducer as the default export