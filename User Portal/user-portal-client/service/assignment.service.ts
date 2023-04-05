import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    create,
    update,
    getAssignment,
    deleteAssignment
} = endpoints.assignment;

export const httpCreateAssignment = (data: any) => {
    return axiosWithToken('post', create, data);
}

export const httpUpdateAssignment = (data: any, id:string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data)
}

export const httpGetAssignment = (id: string) => {
    const url = `${getAssignment}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpDeleteAssignment = (id: string) => {
    const url = `${deleteAssignment}?id=${id}`;
    return axiosWithToken('delete', url)
}