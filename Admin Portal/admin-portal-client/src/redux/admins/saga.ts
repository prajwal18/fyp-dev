import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { actionTypes } from './type';
import { ActionType } from "../../constants/CustomTypes";
import { apiCallNResp } from "../../utils/apiCallNResp";

// Action creators from slice
import {
    updateAdmins,
    updateSearchTerm,
    updatePaginationData
} from "./admins.slice";
// Action creators from slice

// selectors
import { selectSearchTerm, selectPaginationData } from "./admins.slice"
// selectors

// Custom axios calls
import {
    httpGetAllAdmin,
    httpAddAdmin,
    httpUpdateAdmin,
    httpChangePWAdmin,
    httpDeleteAdmin
} from "../../services/admin.service";
// Custom axios calls


const generateFetchQuery = (skip: number, take: number, searchTerm?: string) => {
    return searchTerm ?
        `skip=${skip}&take=${take}&searchTerm=${searchTerm}`
        :
        `skip=${skip}&take=${take}`;
}



// Generator Functions
// Fetch
function* fetchPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(0, 0, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllAdmin(query));
    if (response) {
        // Dispatch admin data to the store
        yield put(updatePaginationData({ ...pagination, total: response.total }));
    }
}

function* fetchAdmins(action: ActionType): Generator<any, any, any> {
    const pagination = yield select(selectPaginationData);
    const searchTerm = yield select(selectSearchTerm);

    const query = generateFetchQuery(pagination.skip, pagination.take, searchTerm);
    const response = yield apiCallNResp(() => httpGetAllAdmin(query));
    if (response) {
        // Dispatch admin data to the store
        yield put(updateAdmins(response.data));
    }

}
// Fetch

// SET Pagination and search term
function* setSearchTerm(action: ActionType): Generator<any, any, any> {
    const searchTerm = action.payload;
    yield put(updateSearchTerm(searchTerm));
    yield fetchAdmins(action);
}
function* setPaginationData(action: ActionType): Generator<any, any, any> {
    const pagination = action.payload;
    yield put(updatePaginationData(pagination));
    yield fetchAdmins(action);
}
// SET Pagination and search term

// Admin operations
function* addAdmin(action: ActionType): Generator<any, any, any> {
    const newAdmin = action.payload;
    const response = yield apiCallNResp(() => httpAddAdmin(newAdmin));
    if (response) {
        toast.success(`${response.data.name} added successfully.`);
        yield fetchPaginationData(action);
    }
    // fetch Admins
}

function* updateAdmin(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpUpdateAdmin(id, data));
    if (response) {
        toast.success(`${response.data.name} updated successfully.`);
        yield fetchAdmins(action);
    }
    // fetchAdmins

}

function* deleteAdmin(action: ActionType): Generator<any, any, any> {
    const { id } = action.payload;
    const response = yield apiCallNResp(() => httpDeleteAdmin(id));
    if (response) {
        yield fetchPaginationData(action);
    }
    // fetchAdmins
}

function* changePassword(action: ActionType): Generator<any, any, any> {
    const { id, data } = action.payload;
    const response = yield apiCallNResp(() => httpChangePWAdmin(id, data));
    if (response) {
        yield fetchAdmins(action);
    }
    // fetchAdmins

}
//Admin Opeartions
// Generator Functions




function* AdminSaga() {
    yield takeEvery(actionTypes.ADMIN_FETCH_PAGINATION_DATA, fetchPaginationData);
    yield takeEvery(actionTypes.FETCH_ALL_ADMINS, fetchAdmins);

    yield takeEvery(actionTypes.ADMIN_SET_SEARCH_TERM, setSearchTerm);
    yield takeEvery(actionTypes.ADMIN_SET_PAGINATION_DATA, setPaginationData);

    yield takeEvery(actionTypes.ADD_NEW_ADMIN, addAdmin);
    yield takeEvery(actionTypes.UPDATE_ADMIN_DATA, updateAdmin);
    yield takeEvery(actionTypes.DELETE_ADMIN, deleteAdmin);

    yield takeEvery(actionTypes.CHANGE_ADMIN_PASSWORD, changePassword);

}

export default AdminSaga;