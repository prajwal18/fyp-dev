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
    },

    testAnswer: {
        check: baseURL + "/test-answer/check",
        create: baseURL + "/test-answer/create",
        update: baseURL + "/test-answer/update",
        grade: baseURL + "/test-answer/grade",
        deleteTA: baseURL + "/test-answer/delete",
        getTest: baseURL + "/test-answer/get-test",
        getAllSpecific: baseURL + "/test-answer/get-all-specific"
    },

    assignment: {
        create: baseURL + "/assignment/create",
        update: baseURL + "/assignment/update",
        getAssignment: baseURL + "/assignment/get-assignment",
    },

    submittedAssignment: {
        check: baseURL + "/assignment-submission/check",
        create: baseURL + "/assignment-submission/create",
        update: baseURL + "/assignment-submission/update",
        grade: baseURL + "/assignment-submission/grade",
        deleteAS: baseURL + "/assignment-submission/delete",
        getSubmission: baseURL + "/assignment-submission/get-submission",
        getAllSpecific: baseURL + "/assignment-submission/get-all-specific"
    },

    stats: {
        headInfo: baseURL + "/stats/head-info",
        courseStat: baseURL + "/stats/course-stat",
        assignmentStat: baseURL + "/stats/assignment-stat",
        testStat: baseURL + "/stats/test-stat",
        testProgress: baseURL + "/stats/test-progress",
        assignmentProgress: baseURL + "/stats/assignment-progress"
    }
}

export default endpoints;