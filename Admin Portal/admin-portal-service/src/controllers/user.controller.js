const asyncWrapper = require("../error/wrapper");
const userService = require("../services/user.service");

// User Registration
const userRegistration = asyncWrapper(async (req, res, next) => {
    const isReqValid = userService.validateRequest(req.body);  // Checks if the request contains the desired parameters
    if (isReqValid) {
        const { success, data, message } = await userService.registerUser(req.body);
        if (success) {
            res.json({ success, data, message });
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
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find User, Specify id");
    }
});
// Edit User Info

// Get Admin Details
const userDetail = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await userService.getUserDetail(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find user, Specify id");
    }

})
// Get Admin Details


// Change Password
// Note: Admin doesn't require knowledge of previous password to change it
const changePassword = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        if (req.body.oldPassword && req.body.newPassword) {
            const { success, data, message } = await userService.changePassword(id, req.body.newPassword);
            if (success) {
                res.json({ success, data, message });
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please provide old and new password.");
        }
    } else {
        throw new Error("Cannot find user, Specify id");
    }
});
// Change Password

const getAllTeachers = asyncWrapper(async(req, res, next) => {
    res.json({success: true, data:[], message: null});
});

const getAllStudents = asyncWrapper(async(req, res, next) => {
    res.json({success:true, data:[], message: null});
});


module.exports = { userRegistration, userUpdate, userDetail, changePassword, getAllTeachers, getAllStudents }