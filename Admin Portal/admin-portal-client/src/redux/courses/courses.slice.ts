import { createSlice } from '@reduxjs/toolkit';

// Initial state for courses slice
import { CoursesIS } from '../../constants/InitialStates';
import { ActionType, CoursesISType } from '../../constants/CustomTypes';
// Initial state for courses slice

// Creating the courses slice
const options = {
    name: 'courses',
    initialState: CoursesIS,
    reducers: {
        updateCourses: (state: CoursesISType, action: ActionType) => {
            return {...state, courses: action.payload}
        },
        updateSearchTerm: (state: CoursesISType, action: ActionType) => {
            return {...state, searchTerm: action.payload}
        },
        updatePaginationData: (state:CoursesISType, action: ActionType) => {
            return {...state, pagination: action.payload}
        }
    }
}
// Creating the slice
export const coursesSlice = createSlice(options);
// Creating the courses slice

// Selector functions
export const selectSearchTerm = (state: any) => {
    return state.courses.searchTerm;
}
export const selectPaginationData = (state: any) => {
    return state.courses.pagination;
}
export const selectAllCourses = (state: any) => {
    return state.courses.courses;
}
// Selector functions


// Exporting the action creator functions
export const { updateCourses, updateSearchTerm, updatePaginationData } = coursesSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default coursesSlice.reducer;
// Exporting the reducer as the default export