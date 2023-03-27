import { createSlice } from '@reduxjs/toolkit';

// Initial state for test slice
import { TestIS, TestIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for test slice

// Creating the test slice
const options = {
    name: 'test',
    initialState: TestIS,
    reducers: {
        updateSelectedTest: (state: TestIST, action: ActionT) => {
            return { ...state, selectedTest: action.payload }
        },
        updateAllTests: (state: TestIST, action: ActionT) => {
            return { ...state, allTests: action.payload }
        },
        updateSelectedAnswerPaper: (state: TestIST, action: ActionT) => {
            return { ...state, selectedAnswerPaper: action.payload }
        },
        updateSearchTerm: (state: TestIST, action: ActionT) => {
            return { ...state, searchTerm: action.payload }
        },
        updatePagination: (state: TestIST, action: ActionT) => {
            return { ...state, pagination: action.payload }
        },
        updateSearchParams: (state: TestIST, action: ActionT) => {
            return { ...state, searchParams: action.payload }
        },
        resetState: (state: TestIST, action: ActionT) => {
            return TestIS
        }
    }
}
// Creating the slice
export const testSlice = createSlice(options);
// Creating the test slice

// Selector functions
export const selectSelectedTest = (state: any) => {
    return state.test.selectedTest;
}
export const selectAllTests = (state: any) => {
    return state.test.allTests;
}
export const selectSelectedAnswerPaper = (state: any) => {
    return state.test.selectedAnswerPaper;
}
export const selectSearchTerm = (state: any) => {
    return state.test.searchTerm;
}
export const selectPagination = (state: any) => {
    return state.test.pagination;
}
export const selectSearchParams = (state: any) => {
    return state.test.searchParams;
}
// Selector functions


// Exporting the action creator functions
export const {
    updateSelectedTest, updateSearchTerm,
    updatePagination, updateSearchParams,
    resetState, updateSelectedAnswerPaper,
    updateAllTests
} = testSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default testSlice.reducer;
// Exporting the reducer as the default export