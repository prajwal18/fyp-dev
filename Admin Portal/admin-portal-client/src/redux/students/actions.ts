import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllStudentsAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_STUDENTS });
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.STUDENT_FETCH_PAGINATION_DATA });
export const fetchSelectedStudentAC = (id: string): ActionType => ({ type: actionTypes.FETCH_SELECTED_STUDENT, payload: {id} });
export const fetchCourseStudentAC = (): ActionType => ({ type: actionTypes.FETCH_COURSE_STUDENT });
export const fetchCourseStudentPaginationAC = (): ActionType => ({ type: actionTypes.FETCH_COURSE_STUDENT_PAGINATION });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.STUDENT_SET_SEARCH_TERM, payload: searchTerm });
export const setCourseStudentSearchTermAC = (searchTerm: string): ActionType => ({type: actionTypes.COURSE_STUDENT_SET_SEARCH_TERM, payload: searchTerm});
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.STUDENT_SET_PAGINATION_DATA, payload: pagination });

export const addStudentAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_STUDENT, payload: data });
export const updateStudentAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_STUDENT_DATA, payload: { id, data } });
export const deleteStudentAC = (id: string): ActionType => ({ type: actionTypes.DELETE_STUDENT, payload: { id } });

export const changeStudentPWAC = (id: string, data: any): ActionType => ({ type: actionTypes.CHANGE_STUDENT_PASSWORD, payload: { id, data } });