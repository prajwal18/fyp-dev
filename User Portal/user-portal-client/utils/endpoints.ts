export const baseURL = 'http://localhost:8000';

const endpoints = {
    user: {
        login: baseURL + "/user/auth/login",
        signup: baseURL + "/user/auth/register",
        update:  baseURL + "/user/update",
        getDetails:  baseURL + "/user/get-details",
        changePassword:  baseURL + "/user/change-password",
    }
}

export default endpoints;