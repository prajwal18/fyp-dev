export const baseURL = process.env.REACT_APP_BASE_URL1;
const endpoints = {
    // To manage the various entities
    admin: {
        register: baseURL + "admin/auth/register",
        update: baseURL + "admin/update",
        getDetail: baseURL + "admin/get-details",
        changePassword: baseURL + "admin/change-password",
        getAllAdmin: baseURL + "admin/get-all-admin"
    }, 
    student: {

    },
    teacher: {

    },
    faculty: {

    },
    course: {
        
    },
    // To manage the various entities

    personal: {
        login: baseURL + "admin/auth/login"   
    }

}

export default endpoints;