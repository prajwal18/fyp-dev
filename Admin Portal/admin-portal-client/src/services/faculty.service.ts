import axios from "axios";
import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const { } = endpoints.faculty;

export const httpGetAllFaculty = (query: string) => {
    const url = `?${query}`;
    return axiosWithToken('get', url);
}

export const httpAddFaculty = (data: any) => axios.post('', data);

export const httpUpdateFaculty = (id: string, data: any) => {
    const url = `?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteFaculty = (id: string) => {
    const url = `?id=${id}`;
    return axiosWithToken('delete', url);
}