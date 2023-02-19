import axios from "axios";
import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const { } = endpoints.teacher;

export const httpGetAllTeacher = (query: string) => {
    const url = `?${query}`;
    return axiosWithToken('get', url);
}

export const httpAddTeacher = (data: any) => axios.post('', data);

export const httpUpdateTeacher = (id: string, data: any) => {
    const url = `?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpChangePWTeacher = (id: string, data: any) => {
    const url = `?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteTeacher = (id: string) => {
    const url = `?id=${id}`;
    return axiosWithToken('delete', url);
}