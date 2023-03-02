import { UserTypes } from "../../constants/Constants";
import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllCoursesAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_COURSES });
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.COURSE_FETCH_PAGINATION_DATA });
export const fetchSelectedCourseAC = (id: string): ActionType => ({ type: actionTypes.FETCH_SELECTED_COURSE, payload: { id } });
export const fetchFacultyCoursesAC = (): ActionType => ({ type: actionTypes.FETCH_FACULTY_COURSES });
export const fetchFacultyCoursePaginationAC = (): ActionType => ({ type: actionTypes.FETCH_FACULTY_COURSE_PAGINATION });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.COURSE_SET_SEARCH_TERM, payload: searchTerm });
export const setFacultyCourseSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.FACULTY_COURSE_SET_SEARCH_TERM, payload: searchTerm });
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.COURSE_SET_PAGINATION_DATA, payload: pagination });

export const addCourseAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_COURSE, payload: data });
export const updateCourseAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_COURSE_DATA, payload: { id, data } });
export const deleteCourseAC = (id: string): ActionType => ({ type: actionTypes.DELETE_COURSE, payload: { id } });

export const updateSelectionPurposeAC = (data: string): ActionType => ({ type: actionTypes.UPDATE_SELECTION_PURPOSE, payload: { data } });

export const addUserToCourseAC = (id:string, role: UserTypes): ActionType => ({ type: actionTypes.ADD_USER_TO_COURSE, payload: { id, role }});
export const removeUserFromCourseAC = (id:string, role: UserTypes): ActionType => ({ type: actionTypes.REMOVE_USER_FROM_COURSE, payload: { id, role }});