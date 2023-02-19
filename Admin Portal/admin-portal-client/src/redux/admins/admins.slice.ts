import { createSlice } from '@reduxjs/toolkit';

// Initial state for admins slice
import { AdminsIS } from '../../constants/InitialStates';
import { ActionType, AdminsISType } from '../../constants/CustomTypes';
// Initial state for admins slice

// Creating the admin slice
const options = {
    name: 'admins',
    initialState: AdminsIS,
    reducers: {
        updateAdmins: (state: AdminsISType, action: ActionType) => {
            return {...state, admins: action.payload}
        },
        updateSearchTerm: (state: AdminsISType, action: ActionType) => {
            return {...state, searchTerm: action.payload}
        },
        updatePaginationData: (state:AdminsISType, action: ActionType) => {
            return {...state, pagination: action.payload}
        }
    }
}
// Creating the slice
export const adminsSlice = createSlice(options);
// Creating the admin slice

// Selector functions
export const selectSearchTerm = (state: any) => {
    return state.admins.searchTerm;
}
export const selectPaginationData = (state: any):any => {
    return state.admins.pagination;
}
export const selectAllAdmins = (state: any) => {
    return state.admins.admins;
}
// Selector functions


// Exporting the action creator functions
export const { updateAdmins, updateSearchTerm, updatePaginationData } = adminsSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default adminsSlice.reducer;
// Exporting the reducer as the default export