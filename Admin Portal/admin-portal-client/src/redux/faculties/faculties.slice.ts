import { createSlice } from '@reduxjs/toolkit';

// Initial state for faculties slice
import { FacultiesIS } from '../../constants/InitialStates';
import { ActionType, FacultiesISType } from '../../constants/CustomTypes';
// Initial state for faculties slice

// Creating the faculty slice
const options = {
    name: 'faculties',
    initialState: FacultiesIS,
    reducers: {
        updateFaculties: (state: FacultiesISType, action: ActionType) => {
            return {...state, faculties: action.payload}
        },
        updateSearchTerm: (state: FacultiesISType, action: ActionType) => {
            return {...state, searchTerm: action.payload}
        },
        updatePaginationData: (state:FacultiesISType, action: ActionType) => {
            return {...state, pagination: action.payload}
        }
    }
}
// Creating the slice
export const facultiesSlice = createSlice(options);
// Creating the faculty slice

// Selector functions
export const selectSearchTerm = (state: FacultiesISType) => {
    return state.searchTerm;
}
export const selectPaginationData = (state: FacultiesISType) => {
    return state.pagination;
}
export const selectAllFaculties = (state: FacultiesISType) => {
    return state.faculties;
}
// Selector functions


// Exporting the action creator functions
export const { updateFaculties, updateSearchTerm, updatePaginationData } = facultiesSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default facultiesSlice.reducer;
// Exporting the reducer as the default export