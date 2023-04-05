export const baseURL = process.env.REACT_APP_BASE_URL1;
export const userBaseURL = process.env.REACT_APP_BASE_URL2;
const endpoints = {
    // To manage the various entities
    admin: {
        register: baseURL + "/admin/auth/register",
        update: baseURL + "/admin/update",
        getDetail: baseURL + "/admin/get-details",
        changePassword: baseURL + "/admin/change-password",
        getAllAdmin: baseURL + "/admin/get-all-admin",
        deleteAdmin: baseURL + "/admin/delete"
    },
    student: {
        register: baseURL + "/user/auth/register",
        update: baseURL + "/user/update",
        getDetail: baseURL + "/user/get-details",
        changePassword: baseURL + "/user/change-password",
        getAllStudents: baseURL + "/user/all-students",
        deleteStudent: baseURL + "/user/delete",
        checkDocuments: baseURL + "/user/check-documents"
    },
    teacher: {
        register: baseURL + "/user/auth/register",
        update: baseURL + "/user/update",
        getDetail: baseURL + "/user/get-details",
        changePassword: baseURL + "/user/change-password",
        getAllTeachers: baseURL + "/user/all-teachers",
        deleteTeacher: baseURL + "/user/delete",
        checkDocuments: baseURL + "/user/check-documents"
    },
    faculty: {
        create: baseURL + "/faculty/create",
        edit: baseURL + "/faculty/update",
        getDetail: baseURL + "/faculty/faculty-details",
        deleteFaculty: baseURL + "/faculty/delete",
        getAllFaculties: baseURL + "/faculty/all-faculties",
        getAllDDFaculties: baseURL + "/faculty/dd-faculties"
    },
    course: {
        create: baseURL + "/course/create",
        edit: baseURL + "/course/update",
        getAllCourses: baseURL + "/course/all-courses",
        getCourseDetail: baseURL + "/course/course-details",

        addUser: baseURL + "/user/enroll",
        removeUser: baseURL + "/user/disenroll",

        deleteCourse: baseURL + "/course/delete",
        facultyCourses: baseURL + "/course/faculty-courses",
    },
    // To manage the various entities

    personal: {
        login: baseURL + "/admin/auth/login"
    }

}

export default endpoints;