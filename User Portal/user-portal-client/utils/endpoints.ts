export const baseURL = 'http://localhost:8000';

const endpoints = {
    user: {
        login: baseURL + "/user/auth/login",
        signup: baseURL + "/user/auth/register",
        update:  baseURL + "/user/update",
        getDetails:  baseURL + "/user/get-details",
        changePassword:  baseURL + "/user/change-password",
        getMembers: baseURL + "/user/get-all-course-members"
    },

    test: {
        create: baseURL + "/test/create",
        update: baseURL + "/test/update",
        getTest: baseURL + "/test/get-test",
        allTest: baseURL + "/test/all-test",
        allReleasedTest: baseURL + "/test/all-released-test"
    },

    testAnswer: {
        create: baseURL + "/test-answer/create",
        update: baseURL + "/test-answer/update",
        grade: baseURL + "/test-answer/grade",
        getTest: baseURL + "/test-answer/get-test",
        allTest: baseURL + "/test-answer/all-test"
    }
}

export default endpoints;