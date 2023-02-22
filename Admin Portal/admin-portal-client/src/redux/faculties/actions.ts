import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllFacultiesAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_FACULTIES });
export const fetchDDFacultiesAC = (): ActionType => ({type: actionTypes.FETCH_DD_FACULTIES});
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.FACULTY_FETCH_PAGINATION_DATA });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.FACULTY_SET_SEARCH_TERM, payload: searchTerm });
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.FACULTY_SET_PAGINATION_DATA, payload: pagination });

export const addFacultyAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_FACULTY, payload: data });
export const updateFacultyAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_FACULTY_DATA, payload: { id, data } });
export const deleteFacultyAC = (id: string): ActionType => ({ type: actionTypes.DELETE_FACULTY, payload: { id } });