const asyncWrapper = require("../error/wrapper");
const adminService = require("../services/admin.service");

// Admin Login
const adminLogin = asyncWrapper(async ( req, res, next ) => {
    if(req.body.email && req.body.password){
        const { success, data, message } = await adminService.adminLogin(req.body);
        if(success){
            res.json({success, data, message});
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Provide email and password.");
    }
});
// Admin Login

// Admin Registration
const adminRegistration = asyncWrapper(async (req, res, next) => {
    const isReqValid = adminService.validateRequest(req.body);  // Checks if the request contains the desired parameters
    if (isReqValid) {
        const { success, data, message } = await adminService.registerAdmin(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Bad request, provide valid information.");
    }
})
// Admin Registration

// Edit Admin Info 
const adminUpdate = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await adminService.updateAdmin(id, req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find Admin, Specify id");
    }
});
// Edit Admin Info

// Get Admin Details
const adminDetail = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await adminService.getAdminDetail(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find Admin, Specify id");
    }

})
// Get Admin Details

// Get all admin
const getAllAdmin = asyncWrapper(async (req, res, next) => {
    const { skip, take } = req.query;
    const {success, data, message, total} = await adminService.getAllAdmin(skip, take);
    if(success){
        res.json({ success, data, message, total });
    } else {
        throw new Error(message);
    }
});
// Get all admin

// Change Password
const changePassword = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        if (req.body.oldPassword && req.body.newPassword) {
            const { success, data, message } = await adminService.changePassword(id, req.body.oldPassword, req.body.newPassword);
            if (success) {
                res.json({ success, data, message });
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please provide old and new password.");
        }
    } else {
        throw new Error("Cannot find Admin, Specify id");
    }
});
// Change Password

module.exports = { adminLogin, adminRegistration, adminUpdate, adminDetail, getAllAdmin, changePassword };