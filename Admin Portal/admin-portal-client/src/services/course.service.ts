import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";
import { UserTypes } from "../constants/Constants";

const {
    create, edit, getAllCourses,
    getCourseDetail, facultyCourses, 
    addUser, removeUser
} = endpoints.course;

export const httpGetAllCourse = (query: string) => {
    const url = `${getAllCourses}?${query}`;
    return axiosWithToken('get', url);
}

export const httpGetFacultyCourses = (query: string) => {
    const url = `${facultyCourses}?${query}`;
    return axiosWithToken('get', url);
}

export const httpGetCourseDetail = (id: string) => {
    const url = `${getCourseDetail}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpAddCourse = (data: any) => axiosWithToken('post', create, data);


export const httpUpdateCourse = (id: string, data: any) => {
    const url = `${edit}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteCourse = (id: string) => {
    const url = `?id=${id}`;
    return axiosWithToken('delete', url);
}

// Add user and remove user (to and from)
export const httpAddUserToCourse = (userId: string, courseId: string, role: UserTypes) => {
    return axiosWithToken('put', addUser, { course: courseId, user: userId, role });
}
export const httpRemoveUserFromCourse = (userId: string, courseId: string, role: UserTypes) => {
    return axiosWithToken('put', removeUser, { course: courseId, user: userId, role } );
}
// Add user and remove user (to and from)