export const baseURL = process.env.REACT_APP_BASE_URL1;
const endpoints = {
    user: {
        login: baseURL + "/user/login",
        signup: baseURL + "/user/register",
        update:  baseURL + "/user/update",
        getDetails:  baseURL + "/user/get-details",
        changePassword:  baseURL + "/user/change-password",
    }
}

export default endpoints;