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
        },
        updateDDFaculties: (state:FacultiesISType, action:ActionType) => {
            return {...state, ddFaculties: action.payload}
        }
    }
}
// Creating the slice
export const facultiesSlice = createSlice(options);
// Creating the faculty slice

// Selector functions
export const selectSearchTerm = (state: any) => {
    return state.faculties.searchTerm;
}
export const selectPaginationData = (state: any) => {
    return state.faculties.pagination;
}
export const selectAllFaculties = (state: any) => {
    return state.faculties.faculties;
}
export const selectDDFaculties = (state: any) => {
    return state.faculties.ddFaculties;
}
// Selector functions


// Exporting the action creator functions
export const { updateFaculties, updateSearchTerm, updatePaginationData, updateDDFaculties } = facultiesSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default facultiesSlice.reducer;
// Exporting the reducer as the default export