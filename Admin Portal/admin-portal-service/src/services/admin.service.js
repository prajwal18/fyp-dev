//Importing admin model
const Admin = require("../models/admin.model");
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
            return { success: true, data: { _id: admin._id, name: admin.name, token: token }, message: "Login successful" }
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
        const imageFileData = await base64toImg(data.profilePicture, 'admins');
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
const getAllAdmin = async (skip, take) => {
    let allAdmin = await Admin.find({}).skip(skip).limit(take);
    let adminsCount = await Admin.count({});
    if (allAdmin) {
        return { success: true, data: allAdmin, message: "Successfully fetched all admin data", total: adminsCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch admin data", total: 0 }
    }
}
// Get all admin data


// Change Admin Password
const changePassword = async (id, oldPassword, newPassword) => {
    const admin = await Admin.findById(id);
    if (admin) {
        // Check to see if old password is correct
        const match = await checkPassword(oldPassword, admin.password);
        if (match) {
            const newEncryptedPW = await encryptPassword(newPassword);
            const updatedAdmin = await Admin.findByIdAndUpdate(id, { password: newEncryptedPW });
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