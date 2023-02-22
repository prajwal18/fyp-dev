import { axiosWithToken } from "../utils/apiCallNResp";
import endpoints from "../utils/endpoints";

const {
    create, edit,
    deleteFaculty, getAllFaculties,
    getAllDDFaculties
} = endpoints.faculty;

export const httpGetAllFaculty = (query: string) => {
    const url = `${getAllFaculties}?${query}`;
    return axiosWithToken('get', url);
}

export const httpGetDDFaculties = () => axiosWithToken('get', getAllDDFaculties);

export const httpAddFaculty = (data: any) => axiosWithToken('post', create, data);

export const httpUpdateFaculty = (id: string, data: any) => {
    const url = `${edit}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpDeleteFaculty = (id: string) => {
    const url = `${deleteFaculty}?id=${id}`;
    return axiosWithToken('delete', url);
}