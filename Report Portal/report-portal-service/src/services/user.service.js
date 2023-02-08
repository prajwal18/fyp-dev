//Importing admin model
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
//Importing password creation and comparision functions
const { base64toImg } = require("../utils/read.write.image");
const { checkPassword, encryptPassword } = require("../utils/encrypt.decrypt.password");


// User Login
const loginUser = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        const match = await checkPassword(userData.password, user.password);
        if (match) {
            const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET);  // JWT Contains user's email and role
            return { success: true, data: { token }, message: "Login successful" };
        } else {
            return { success: false, data: null, message: "Cannot login. Password doesn't match" };
        }
    } else {
        return { success: false, data: null, message: "Cannot login. Email not found." };
    }
}
// User Login


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
    if (userData.profilePicture) {
        const imageData = userData.profilePicture; // Base 64 data
        delete userData.profilePicture;
        delete userData.coverPicture;
        const imageFilePath = await base64toImg(imageData, "user/profile");
        userData.profilePicture = imageFilePath;
    }
    const hashedPassword = await encryptPassword(userData.password);
    userData.password = hashedPassword;
    const user = await User.create(userData);
    if (user) {
        return { success: true, data: user, message: "New user created successfully" }
    } else {
        return { success: false, data: null, message: "Cannot create new user." }
    }
}
// Register User


// Update User
const updateUser = async (id, data) => {
    const userData = JSON.parse(JSON.stringify(data));  // Making a deep copy of an object
    delete userData.password;                           // Cannot update password here

    if (userData.profilePicture) {
        const imageData = userData.profilePicture;
        delete userData.profilePicture;
        const imageFilePath = await base64toImg(imageData, "user/profile");
        userData.profilePicture = imageFilePath;
    }
    if(userData.coverPicture){
        const coverData = userData.coverPicture;
        delete userData.coverPicture;
        const imageFilePath = await base64toImg(coverData, "user/cover");
        userData.coverPicture = imageFilePath;
    }
    const user = await User.findByIdAndUpdate(id, userData);
    if(user){
        return { success: true, data: user, message: "User's data updated successfully" }
    } else {
        throw new Error("Sorry, cannot update user's data");
    }
}
// Update User

// Get user Detail
const getUserDetail = async ( id ) => {
    const user = await User.findById(id);
    if(user){
        return { success: true, data: user, message:"User's data fetched successfully." }
    } else {
        throw new Error("Cannot find user.");
    }
}
// Get user Detail

// Change Password
const changePassword = async (id, oldPassword, newPassword) => {
    const user = await User.findById(id);
    if(user) {
        if(user.password === oldPassword){
            const updatedUser = await User.findByIdAndUpdate(id, {password: newPassword});
            if(updatedUser){
                return  { success: true, data: updatedUser, message: "Password changed successfully" }
            } else {
                throw new Error("Sorry, cannot update password");
            }
        } else {
            throw new Error("Old password does not match");
        }
    } else {
        throw new Error("Cannot find user.");
    }
}
// Change Password

// 




module.exports = { loginUser, validateRequest, registerUser, updateUser, getUserDetail, changePassword }