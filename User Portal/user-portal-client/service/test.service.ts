import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    create,
    update,
    getTest,
    deleteTest
} = endpoints.test;

export const httpCreateTest = (data: any) => {
    return axiosWithToken('post', create, data);
}

export const httpUpdateTest = (data: any, id:string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data)
}

export const httpGetTest = (id: string) => {
    const url = `${getTest}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpDeleteTest = (id: string) => {
    const url = `${deleteTest}?id=${id}`;
    return axiosWithToken('delete', url)
}
