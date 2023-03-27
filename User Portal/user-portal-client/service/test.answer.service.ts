import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    check, 
    create,
    update,
    grade,
    getTest, 
    getAllSpecific
} = endpoints.testAnswer;

export const httpCheckTestAnswerExists = (testId: string, studentId: string) => {
    const url = `${check}?testId=${testId}&studentId=${studentId}`;
    return axiosWithToken('get', url);
}

export const httpCreateTestAnswer = (data: any) => {
    return axiosWithToken('post', create, data);
}

export const httpUpdateTestAnswer = (data: any, id:string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGradeTestAnswer = (data:any, id:string) => {
    const url = `${grade}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGetTestAnswer = (id: string) => {
    const url = `${getTest}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpGetAllSpecificTest = (query: string) => {
    const url = `${getAllSpecific}${query}`;
    return axiosWithToken('get', url);
}