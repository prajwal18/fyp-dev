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
        check: baseURL + "/test-answer/check",
        create: baseURL + "/test-answer/create",
        update: baseURL + "/test-answer/update",
        grade: baseURL + "/test-answer/grade",
        getTest: baseURL + "/test-answer/get-test",
        getAllSpecific: baseURL + "/test-answer/get-all-specific"
    },

    assignment: {
        create: baseURL + "/assignment/create",
        update: baseURL + "/assignment/update",
        getAssignment: baseURL + "/assignment/get-assignment",
        allAssignment: baseURL + "/assignment/all-assignment",
        allReleasedAssignment: baseURL + "/assignment/all-released-assignment"
    },

    submittedAssignment: {
        check: baseURL + "/assignment-submission/check",
        create: baseURL + "/assignment-submission/create",
        update: baseURL + "/assignment-submission/update",
        grade: baseURL + "/assignment-submission/grade",
        getSubmission: baseURL + "/assignment-submission/get-submission",
        allSubmission: baseURL + "/assignment-submission/all-submission"
    }
}

export default endpoints;