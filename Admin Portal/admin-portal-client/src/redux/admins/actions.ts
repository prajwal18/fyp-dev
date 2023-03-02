import { ActionType, PaginationStateType } from "../../constants/CustomTypes";
import { actionTypes } from "./type";

export const fetchAllAdminsAC = (): ActionType => ({ type: actionTypes.FETCH_ALL_ADMINS });
export const fetchSelectedAdminAC = (id: string): ActionType => ({ type: actionTypes.FETCH_SELECTED_ADMIN, payload: { id } });
export const fetchPaginationDataAC = (): ActionType => ({ type: actionTypes.ADMIN_FETCH_PAGINATION_DATA });


export const setSearchTermAC = (searchTerm: string): ActionType => ({ type: actionTypes.ADMIN_SET_SEARCH_TERM, payload: searchTerm });
export const setPaginationDataAC = (pagination: PaginationStateType): ActionType => ({ type: actionTypes.ADMIN_SET_PAGINATION_DATA, payload: pagination });

export const addAdminAC = (data: any): ActionType => ({ type: actionTypes.ADD_NEW_ADMIN, payload: data });
export const updateAdminAC = (id: string, data: any): ActionType => ({ type: actionTypes.UPDATE_ADMIN_DATA, payload: { id, data } });
export const deleteAdminAC = (id: string): ActionType => ({ type: actionTypes.DELETE_ADMIN, payload: { id } });

export const changeAdminPWAC = (id: string, data: any): ActionType => ({ type: actionTypes.CHANGE_ADMIN_PASSWORD, payload: { id, data } });