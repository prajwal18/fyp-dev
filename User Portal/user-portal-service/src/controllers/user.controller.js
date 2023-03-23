const asyncWrapper = require("../error/wrapper");
const userService = require("../services/user.service");
const response = require("../utils/response.util");

// User Login
const userLogin = asyncWrapper(async (req, res, next) => {
    if (req.body.email && req.body.password) {
        const { success, data, message } = await userService.loginUser(req.body);
        if (success) {
            response.success(res, data, message);
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Bad request, provide a valid email and password");
    }
})
// User Login

// User Registration
const userRegistration = asyncWrapper(async (req, res, next) => {
    const isReqValid = userService.validateRequest(req.body);  // Checks if the request contains the desired parameters
    if (isReqValid) {
        const { success, data, message } = await userService.registerUser(req.body);
        if (success) {
            response.success(res, data, message);
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Bad request, provide valid information.");
    }
})
// User Registration

// Edit User Info 
const userUpdate = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await userService.updateUser(id, req.body);
        if (success) {
            response.success(res, data, message);
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find User");
    }
});
// Edit User Info

// Get Admin Details
const userDetail = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await userService.getUserDetail(id);
        if (success) {
            response.success(res, data, message);
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find user");
    }

})
// Get Admin Details


// Change Password
const changePassword = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        if (req.body.oldPassword && req.body.newPassword) {
            const { success, data, message } = await userService.changePassword(id, req.body.oldPassword, req.body.newPassword);
            if (success) {
                response.success(res, data, message);
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please provide old and new password.");
        }
    } else {
        throw new Error("Cannot find user");
    }
});
// Change Password



// Get all course members
const getAllCourseMembers = asyncWrapper(async(req, res, next) => {
    const { courseIds, role, searchTerm, skip, take } = req.query;
    const courses = courseIds.split(',');
    const roles = role.split(',');

    if(courses.length && roles.length){
        const {success, data, message, hits} = await userService.getAllCourseMembers(courses, roles, searchTerm, skip, take);
        if(success) {
            res.json({success, data, message, hits});
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find users, specify a course.');
    }
});
// Get all course members



module.exports = { userLogin, userRegistration, userUpdate, userDetail, changePassword, getAllCourseMembers }