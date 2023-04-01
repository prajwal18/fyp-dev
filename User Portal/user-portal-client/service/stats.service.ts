import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    headInfo,
    courseStat,
    assignmentStat,
    testStat,
    testProgress,
    assignmentProgress
} = endpoints.stats;

export const httpGetHeadInfo = () => {
    return axiosWithToken('get', headInfo);
}

export const httpGetCourseStat = () => {
    return axiosWithToken('get', courseStat);
}

export const httpGetAssignmentStat = (courseIds: string) => {
    const url = `${assignmentStat}?courseIds=${courseIds}`;
    return axiosWithToken('get', url);
}

export const httpGetTestStat = (courseIds: string) => {
    const url = `${testStat}?courseIds=${courseIds}`;
    return axiosWithToken('get', url);
}

export const httpGetTestProgress = (query: string) => {
    const url = `${testProgress}${query}`;
    return axiosWithToken('get', url);
}

export const httpGetAssignmentProgress = (query: string) => {
    const url = `${assignmentProgress}${query}`;
    return axiosWithToken('get', url);
}