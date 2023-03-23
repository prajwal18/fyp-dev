import axios from "axios";
import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    login,
    signup,
    update,
    getDetails,
    changePassword,
    getMembers
} = endpoints.user;

export const httpUserLogin = ({ email, password }: { email: string, password: string }) => {
    return axios.post(login, { email, password });
}

export const httpUserRegistration = (data: any) => {
    return axios.post(signup, data);
}

export const httpUpdateUser = (data: any, id: string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGetUserDetails = (id: string) => {
    const url = `${getDetails}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpChangeUserPassword = (data: any, id: string) => {
    const url = `${changePassword}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGetAllMembers = (query: string) => {
    const url=`${getMembers}${query}`;
    return axiosWithToken('get', url);
}