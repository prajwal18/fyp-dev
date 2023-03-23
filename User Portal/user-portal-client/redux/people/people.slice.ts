import { createSlice } from '@reduxjs/toolkit';

// Initial state for people slice
import { PeopleIS, PeopleIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for people slice

// Creating the people slice
const options = {
    name: 'people',
    initialState: PeopleIS,
    reducers: {
        updateMembers: (state: PeopleIST, action: ActionT) => {
            return {...state, members: action.payload}
        },
        updateSearchTerm: (state: PeopleIST, action: ActionT) => {
            return {...state, searchTerm: action.payload}
        },
        updatePagination: (state: PeopleIST, action: ActionT) => {
            return {...state, pagination: action.payload}
        },
        updateSearchParams: (state: PeopleIST, action: ActionT) => {
            return {...state, searchParams: action.payload}
        },
        updateSelectedMember: (state: PeopleIST, action: ActionT) => {
            return {...state, selectedMember: action.payload}
        },
        resetState: (state: PeopleIST, action: ActionT) => {
            return PeopleIS
        }
    }
}
// Creating the slice
export const peopleSlice = createSlice(options);
// Creating the people slice

// Selector functions
export const selectMembers = (state: any) => {
    return state.people.members;
}
export const selectSearchTerm = (state: any) => {
    return state.people.searchTerm;
}
export const selectPagination = (state: any) => {
    return state.people.pagination;
}
export const selectSearchParams = (state: any) => {
    return state.people.searchParams;
}
export const selectSelectedMember = (state: any) => {
    return state.people.selectedMember;
}
// Selector functions


// Exporting the action creator functions
export const { updateMembers, updateSearchTerm, updatePagination, updateSelectedMember, updateSearchParams, resetState } = peopleSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default peopleSlice.reducer;
// Exporting the reducer as the default export