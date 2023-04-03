import endpoints from "@/utils/endpoints";
import { axiosWithToken } from "@/utils/apiCallNResp";

const {
    check,
    create,
    update,
    getConversation
} = endpoints.conversation;

export const httpCheckConversationExists = (ids: string) => {
    const url = `${check}?userIds=${ids}`;
    return axiosWithToken('get', url);
};

export const httpCreateConversation =  (ids: string) => {
    const url = `${create}?userIds=${ids}`;
    return axiosWithToken('post', url);
};

export const httpUpdateConversation = (data:any, id: string) => {
    const url = `${update}?id=${id}`;
    return axiosWithToken('put', url, data);
}

export const httpGetConversation = (id: string) =>{
    const url = `${getConversation}?id=${id}`;
    return axiosWithToken('get', url);
}