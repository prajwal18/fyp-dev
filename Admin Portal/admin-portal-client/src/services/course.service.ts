import axios from "axios";
import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const {
    create, edit, getAllCourses
} = endpoints.course;

export const httpGetAllCourse = (query: string) => {
    const url = `${getAllCourses}?${query}`;
    return axiosWithToken('get', url);
}

export const httpAddCourse = (data: any) => axiosWithToken('post', create, data);

export const httpAddUserToCourse = (userId: string, courseId: string) => {
    const url = `?userId=${userId}&courseId=${courseId}`;
    return axiosWithToken('put', url);
}

export const httpUpdateCourse = (id: string, data: any) => {
    const url = `${edit}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteCourse = (id: string) => {
    const url = `?id=${id}`;
    return axiosWithToken('delete', url);
}