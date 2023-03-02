import axios from "axios";
import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const {
    getAllAdmin, register,
    update, changePassword,
    deleteAdmin, getDetail
} = endpoints.admin;

export const httpGetAllAdmin = (query: string) => {
    const url = `${getAllAdmin}?${query}`;
    return axiosWithToken('get', url);
}

export const httpAddAdmin = (data: any) => axios.post(register, data);

export const httpUpdateAdmin = (id: string, data: any) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpChangePWAdmin = (id: string, data: any) => {
    const url = `${changePassword}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteAdmin = (id: string) => {
    const url = `${deleteAdmin}?id=${id}`;
    return axiosWithToken('delete', url);
}

export const httpGetAdminDetail = (id: string) => {
    const url = `${getDetail}?id=${id}`;
    return axiosWithToken('get', url);
}