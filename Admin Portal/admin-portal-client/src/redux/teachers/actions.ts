import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllTeachersAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_TEACHERS });
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.TEACHER_FETCH_PAGINATION_DATA });
export const fetchSelectedTeacherAC = (id: string): ActionType => ({ type: actionTypes.FETCH_SELECTED_TEACHER, payload: {id} });
export const fetchCourseTeacherAC = (): ActionType => ({ type: actionTypes.FETCH_COURSE_TEACHER });
export const fetchCourseTeacherPaginationAC = (): ActionType => ({ type: actionTypes.FETCH_COURSE_TEACHER_PAGINATION });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.TEACHER_SET_SEARCH_TERM, payload: searchTerm });

export const setCourseTeacherSearchTermAC = (searchTerm: string): ActionType => ({type: actionTypes.COURSE_TEACHER_SET_SEARCH_TERM, payload: searchTerm});
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.TEACHER_SET_PAGINATION_DATA, payload: pagination });

export const addTeacherAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_TEACHER, payload: data });
export const updateTeacherAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_TEACHER_DATA, payload: { id, data } });
export const deleteTeacherAC = (id: string): ActionType => ({ type: actionTypes.DELETE_TEACHER, payload: { id } });

export const changeTeacherPWAC = (id:string, data:any):ActionType => ({type: actionTypes.CHANGE_TEACHER_PASSWORD, payload: {id, data}});