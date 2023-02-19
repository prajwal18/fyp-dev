import axios from "axios";
import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const { } = endpoints.student;

export const httpGetAllStudent = (query: string) => {
    const url = `?${query}`;
    return axiosWithToken('get', url);
}

export const httpAddStudent = (data: any) => axios.post('', data);

export const httpUpdateStudent = (id: string, data: any) => {
    const url = `?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpChangePWStudent = (id: string, data: any) => {
    const url = `?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteStudent = (id: string) => {
    const url = `?id=${id}`;
    return axiosWithToken('delete', url);
}

/**
 * Notes:
 * 1) All the http methods defined here is expected to get a response of the following structure:
 *   {
 *      success: true | false,
 *      data: some kind of data if the success is true, else null
 *      message: error message or null
 *      hits: (only for httpGetAllStudent) a number representing the total number of students
 *   }
 * 
 */