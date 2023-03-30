import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    check, 
    create,
    update,
    grade,
    getSubmission,
    getAllSpecific
} = endpoints.submittedAssignment;

export const httpCheckSubmittedAssignmentExists = (submissionId: string, studentId: string) => {
    const url = `${check}?assignmentId=${submissionId}&studentId=${studentId}`;
    return axiosWithToken('get', url);
}

export const httpCreateSubmittedAssignment = (data: any) => {
    return axiosWithToken('post', create, data);
}

export const httpUpdateSubmittedAssignment = (data: any, id:string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGradeSubmittedAssignment = (data:any, id:string) => {
    const url = `${grade}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGetSubmittedAssignment = (id: string) => {
    const url = `${getSubmission}?id=${id}`;
    return axiosWithToken('get', url);
}

export const httpGetAllSpecificAssignment = (query: string) => {
    const url = `${getAllSpecific}${query}`;
    return axiosWithToken('get', url);
}