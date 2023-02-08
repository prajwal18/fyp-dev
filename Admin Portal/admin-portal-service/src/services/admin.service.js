//Importing admin model
const Admin = require("../model/admin.model");
const jwt = require("jsonwebtoken");
//Importing password creation and comparision functions
const { checkPassword, encryptPassword } = require("../utils/encrypt.decrypt.password");
const { base64toImg } = require("../utils/read.write.image");


// Admin Login
const adminLogin = async (adminData) => {
    const admin = await Admin.findOne({ email: adminData.email });
    if (admin) {
        const match = await checkPassword(adminData.password, admin.password);
        if (match) {
            const token = await jwt.sign({ email: admin.email }, process.env.JWT_SECRET);
            return { success: true, data: { token: token }, message: "Login successful" }
        } else {
            return { success: false, data: null, message: "Cannot login. Password does not match." }
        }
    } else {
        return { success: false, data: null, message: "Cannot login. Email not found." }
    }
}
// Admin Login


// Validate request for admin Registration
const validateRequest = async (data) => {
    if (data.email && data.password && data.name && data.contact) {
        return true;
    } else {
        return false;
    }
}
// Validate request for admin Registration

// Register admin
const registerAdmin = async (adminData) => {
    let data = JSON.parse(JSON.stringify(adminData)); //Creating a deep copy of an object
    let password = await encryptPassword(data.password);
    data = { ...data, password };
    if (data.profilePicture) {
        const imageFileData = await base64toImg(data.profilePicture);
        data.profilePicture = imageFileData;
    }
    const admin = await Admin.create(data);
    if (admin) {
        return { success: true, data: admin, message: "Admin Created successfully" }
    } else {
        return { success: false, data: null, message: "Bad request cannot create new admin" }
    }
}
// Register admin

// Update admin data
const updateAdmin = async (id, adminData) => {
    let data = JSON.parse(JSON.stringify(adminData)); //Creating a deep copy of an object
    if (data.password) {
        delete data.password;
    }
    if (data.profilePicture) {
        const imageFileData = await base64toImg(data.profilePicture);
        data.profilePicture = imageFileData;
    }
    const admin = await Admin.findByIdAndUpdate(id, data);
    if (admin) {
        return { success: true, data: admin, message: "Admin Updated successfully" }
    } else {
        return { success: false, data: null, message: "Bad request cannot Update admin details" }
    }
}
// Update admin data

// Get admin detail
const getAdminDetail = async (id) => {
    let admin = await Admin.findById(id);
    if (admin) {
        return { success: true, data: admin, message: "Admin fetched successfully" }
    } else {
        return { success: false, data: null, message: "Cannot find admin" }
    }
}
// Get admin detail

// Get all admin data
const getAllAdmin = async () => {
    let allAdmin = await Admin.find({});
    if (allAdmin) {
        return { success: true, data: allAdmin, message: "Successfully fetched all admin data" }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch admin data" }
    }
}
// Get all admin data


// Change Admin Password
const changePassword = async (id, oldPassword, newPassword) => {
    const admin = await Admin.findById(id);
    if (admin) {
        if (admin.password === oldPassword) {
            const updatedAdmin = await Admin.findByIdAndUpdate(id, { password: newPassword });
            if (updatedAdmin) {
                return { success: true, data: updatedAdmin, message: "Password changed successfully" }
            } else {
                return { success: false, data: null, message: "Sorry, cannot update password" }
            }
        } else {
            return { success: false, data: null, message: "Old password does not match" }
        }
    } else {
        return { success: false, data: null, message: "Cannot find admin." }
    }
}
// Change Admin Password


module.exports = { adminLogin, validateRequest, registerAdmin, updateAdmin, getAdminDetail, getAllAdmin, changePassword };