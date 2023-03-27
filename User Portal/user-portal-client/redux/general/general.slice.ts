import { createSlice } from '@reduxjs/toolkit';

// Initial state for general slice
import { GeneralIS, GeneralIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for general slice

// Creating the general slice
const options = {
    name: 'general',
    initialState: GeneralIS,
    reducers: {
        updateOpenProfile: (state: GeneralIST, action: ActionT) => {
            return { ...state, openProfile: action.payload }
        },
        updateIncludeSidebar: (state: GeneralIST, action: ActionT) => {
            return { ...state, includeSidebar: action.payload }
        },
        updateUser: (state: GeneralIST, action: ActionT) => {
            return { ...state, user: action.payload }
        },
        updateCourses: (state: GeneralIST, action: ActionT) => {
            return { ...state, courses: action.payload }
        },
        resetState: (state: GeneralIST, action: ActionT) => {
            return GeneralIS
        }
    }
}
// Creating the slice
export const generalSlice = createSlice(options);
// Creating the general slice

// Selector functions
export const selectUser = (state: any) => {
    return state.general.user;
}
export const selectCourses = (state: any) => {
    return state.general.courses;
}
export const selectIncludeSidebar = (state: any) => {
    return state.general.includeSidebar;
}
export const selectOpenProfile = (state: any) => {
    return state.general.openProfile
}
// Selector functions


// Exporting the action creator functions
export const { updateUser, updateCourses, updateIncludeSidebar, updateOpenProfile, resetState } = generalSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default generalSlice.reducer;
// Exporting the reducer as the default export