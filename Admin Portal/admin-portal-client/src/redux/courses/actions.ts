import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllCoursesAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_COURSES });
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.COURSE_FETCH_PAGINATION_DATA });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.COURSE_SET_SEARCH_TERM, payload: searchTerm });
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.COURSE_SET_PAGINATION_DATA, payload: pagination });

export const addCourseAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_COURSE, payload: data });
export const updateCourseAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_COURSE_DATA, payload: { id, data } });
export const deleteCourseAC = (id: string): ActionType => ({ type: actionTypes.DELETE_COURSE, payload: { id } });