import axios from "axios";
import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    create,
    update,
    getAssignment
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