import axios from "axios";
import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    login,
    signup,
    update,
    getDetails,
    changePassword
} = endpoints.user;

export const httpUserLogin = (email: string, password: string) => {
    return axios.post(login, {email, password});
}

export const httpUserRegistration = (data: any) => {
    return axios.post(signup, data);
}

export const httpUpdateUser = (data: any) => {
    return axiosWithToken('put', update, data);
}

export const httpGetUserDetails = (id: string) => {
    const url = `${getDetails}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpChangeUserPassword = (id: string, data: any) => {
    const url = `${changePassword}?id=${id}`;
    return axiosWithToken('put', url, data);
}