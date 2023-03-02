import { createSlice } from '@reduxjs/toolkit';

// Initial state for students slice
import { StudentsIS } from '../../constants/InitialStates';
import { ActionType, StudentsISType } from '../../constants/CustomTypes';
// Initial state for students slice

// Creating the student slice
const options = {
    name: 'students',
    initialState: StudentsIS,
    reducers: {
        updateStudents: (state: StudentsISType, action: ActionType) => {
            return { ...state, students: action.payload }
        },
        updateSelectedStudent: (state: StudentsISType, action: ActionType) => {
            return { ...state, selectedStudent: action.payload }
        },
        updateSearchTerm: (state: StudentsISType, action: ActionType) => {
            return { ...state, searchTerm: action.payload }
        },
        updatePaginationData: (state: StudentsISType, action: ActionType) => {
            return { ...state, pagination: action.payload }
        },
        resetState: (state: StudentsISType, action: ActionType) => {
            return StudentsIS
        }
    }
}
// Creating the slice
export const studentsSlice = createSlice(options);
// Creating the student slice

// Selector functions
export const selectSearchTerm = (state: any) => {
    return state.students.searchTerm;
}
export const selectPaginationData = (state: any) => {
    return state.students.pagination;
}
export const selectAllStudents = (state: any) => {
    return state.students.students;
}
export const selectSelectedStudent = (state: any) => {
    return state.students.selectedStudent;
}
// Selector functions


// Exporting the action creator functions
export const {
    updateStudents, updateSearchTerm,
    updatePaginationData, updateSelectedStudent,
    resetState
} = studentsSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default studentsSlice.reducer;
// Exporting the reducer as the default export