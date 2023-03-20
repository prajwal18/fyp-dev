import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

/**
 * 
 * @param fn a callback function that is expected to make an api call and return the response
 * @returns { data } Api response data if api call was successful, null otherwise
 */
export const apiCallNResp = async (fn: () => any) => {
    try {
        const response = await fn();
        if (response.data.success) {
            return response.data;
        } else {
            toast.error(response.data.message);
            return null;
        }
    } catch (error: any) {
        toast.error(error.message);
        console.log('Error:', error.message);
        return null;
    }
}

export const axiosWithToken = (method: string, url: string, data?: any) => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    if (data) {
        return axios({ method, url, data, headers: { 'Authorization': `Bearer ${token}` } })
    } else {
        return axios({ method, url, headers: { 'Authorization': `Bearer ${token}` } })
    }
}