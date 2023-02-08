//Importing admin model
const User = require("../models/user.model");
//Importing password creation and comparision functions
const { encryptPassword } = require("../utils/encrypt.decrypt.password");


// Validate Request for user registration
const validateRequest = (data) => {
    if (
        data.name && data.email && data.password && data.contact
        && data.role && data.zipcode && data.address
        && data.aboutMe
    ) {
        return true;
    } else {
        return false;
    }
}
// Validate Request for user registration


// Register User
const registerUser = async (data) => {
    const userData = JSON.parse(JSON.stringify(data)); // Making a deep copy of an object
    // Admin cannot upload user's image
    delete userData.profilePicture;
    delete userData.coverPicture;
    // Admin cannot upload user's image

    const hashedPassword = await encryptPassword(userData.password);
    userData.password = hashedPassword;

    const user = await User.create(userData);
    if (user) {
        return { success: true, data: user, message: "New user created successfully" }
    } else {
        return { success: false, data: null, message: "Cannot create new User" };
    }
}
// Register User


// Update User
const updateUser = async (id, data) => {
    const userData = JSON.parse(JSON.stringify(data));  // Making a deep copy of an object
    delete userData.password;                           // Cannot update password here

    // Admin cannot upload user's image
    delete userData.profilePicture;
    delete userData.coverPicture;
    delete userData.password;           // Also there's a seperate API to update password
    // Admin cannot upload user's image

    const user = await User.findByIdAndUpdate(id, userData);
    if (user) {
        return { success: true, data: user, message: "User's data updated successfully" }
    } else {
        return { success: false, data: null, message: "Sorry, cannot update user's data" };
    }
}
// Update User

// Get user Detail
const getUserDetail = async (id) => {
    const user = await User.findById(id);
    if (user) {
        return { success: true, data: user, message: "User's data fetched successfully." }
    } else {
        return { success: false, data: null, message: "Cannot find user." };

    }
}
// Get user Detail

// Change Password
const changePassword = async (id, newPassword) => {
    const user = await User.findById(id);
    if (user) {
        const updatedUser = await User.findByIdAndUpdate(id, { password: newPassword });
        if (updatedUser) {
            return { success: true, data: updatedUser, message: "Password changed successfully" }
        } else {
            return { success: false, data: null, message: "Sorry, cannot update password" };
        }

    } else {
        return { success: false, data: null, message: "Cannot find user." };
    }
}
// Change Password

// Get all users
const getAllUsers = async () => {
    const allUsers = await User.find({});
    if(allUsers){
        return { success: false, data:allUsers, message: "All users retrived successfully" }
    } else {
        return { success: false, data: null, message:"Sorry, can't find any users" }  
    }
}
// Get all users




module.exports = { validateRequest, registerUser, updateUser, getUserDetail, getAllUsers, changePassword }