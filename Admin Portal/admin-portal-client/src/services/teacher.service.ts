import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const {
    register, update,
    getDetail, changePassword,
    getAllTeachers, deleteTeacher
} = endpoints.teacher;

export const httpGetAllTeacher = (query: string) => {
    const url = `${getAllTeachers}?${query}`;
    return axiosWithToken('get', url);
}

export const httpGetTeacherDetail = (id: string) => {
    const url = `${getDetail}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpAddTeacher = (data: any) => axiosWithToken('post', register, data);

export const httpUpdateTeacher = (id: string, data: any) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpChangePWTeacher = (id: string, data: any) => {
    const url = `${changePassword}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteTeacher = (id: string) => {
    const url = `${deleteTeacher}?id=${id}`;
    return axiosWithToken('delete', url);
}

/**
 * Notes:
 * 1) All the http methods defined here is expected to get a response of the following structure:
 *   {
 *      success: true | false,
 *      data: some kind of data if the success is true, else null
 *      message: error message or null
 *      hits: (only for httpGetAllTeacher) a number representing the total number of students
 *   }
 * 
 */