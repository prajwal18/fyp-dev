import { createSlice } from '@reduxjs/toolkit';

// Initial state for stat slice
import { StatIS, StatIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for stat slice

// Creating the stat slice
const options = {
    name: 'stat',
    initialState: StatIS,
    reducers: {
        updateHeadInfo: (state: StatIST, action: ActionT) => {
            return { ...state, headInfo: action.payload }
        },


        updateTestCourses: (state: StatIST, action: ActionT) => {
            return { ...state, searchParam: { ...state.searchParam, testCourses: action.payload } }
        },
        updateAssignmentCourses: (state: StatIST, action: ActionT) => {
            return { ...state, searchParam: { ...state.searchParam, assignmentCourses: action.payload } }
        },

        updateTestProgress: (state: StatIST, action: ActionT) => {
            return { ...state, testProgress: action.payload }
        },
        updateAssignmentProgress: (state: StatIST, action: ActionT) => {
            return { ...state, assignmentProgress: action.payload }
        },


        updateTestData: (state: StatIST, action: ActionT) => {
            return { ...state, testData: action.payload }
        },
        updateAssignmentData: (state: StatIST, action: ActionT) => {
            return { ...state, assignmentData: action.payload }
        },


        updateCourseStat: (state: StatIST, action: ActionT) => {
            return { ...state, courseStat: action.payload }
        },
        updateAssignmentStat: (state: StatIST, action: ActionT) => {
            return { ...state, assignmentStat: action.payload }
        },
        updateTestStat: (state: StatIST, action: ActionT) => {
            return { ...state, testStat: action.payload }
        },


        updateStudents: (state: StatIST, action: ActionT) => {
            return { ...state, students: action.payload }
        },

        resetState: (state: StatIST, action: ActionT) => {
            return StatIS
        }
    }
}
// Creating the slice
export const statSlice = createSlice(options);
// Creating the stat slice

// Selector functions
export const selectHeadInfo = (state: any) => {
    return state.stat.headInfo;
}


export const selectSearchParam = (state: any) => {
    return state.stat.searchParam;
}


export const selectTestProgress = (state:any) => {
    return state.stat.testProgress;
}
export const selectAssignmentProgress = (state:any) => {
    return state.stat.assignmentProgress;
}


export const selectTestData = (state:any) => {
    return state.stat.testData;
}
export const selectAssignmentData = (state:any) => {
    return state.stat.assignmentData;
}


export const selectCourseStat = (state: any) => {
    return state.stat.courseStat;
}
export const selectAssignmentStat = (state: any) => {
    return state.stat.assignmentStat;
}
export const selectTestStat = (state: any) => {
    return state.stat.testStat;
}


export const selectStudents = (state:any) => {
    return state.stat.students;
}
// Selector functions


// Exporting the action creator functions
export const {
    updateHeadInfo, updateCourseStat, updateAssignmentStat,
    updateTestStat, updateTestCourses, updateAssignmentCourses,
    resetState, updateStudents, updateTestData, updateAssignmentData,
    updateAssignmentProgress, updateTestProgress
} = statSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default statSlice.reducer;
// Exporting the reducer as the default export