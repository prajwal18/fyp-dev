//Importing admin model
const User = require("../models/user.model");
const Course = require("../models/course.model");
const jwt = require("jsonwebtoken");
//Importing password creation and comparision functions
const { base64toImg, removeImage } = require("../utils/read.write.image");
const { checkPassword, encryptPassword } = require("../utils/encrypt.decrypt.password");


// User Login
const loginUser = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        const match = await checkPassword(userData.password, user.password);
        if (match) {
            const token = jwt.sign({ email: user.email, role: user.role, id: user._id }, process.env.JWT_SECRET);  // JWT Contains user's email and role
            return {
                success: true, data: {
                    token,
                    email: user.email,
                    role: user.role,
                    id: user._id
                }, message: "Login successful"
            };
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
        delete user.password;
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

    console.log("\n\n\n", userData, "\n\n\n");
    if (userData.profilePicture) {
        const imageData = userData.profilePicture;
        delete userData.profilePicture;
        const imageFilePath = await base64toImg(imageData, "user/profile");
        removeOldProfilePic(id);
        userData.profilePicture = imageFilePath;
    }

    const user = await User.findByIdAndUpdate(id, userData);
    if (user) {
        const updatedUser = await User.findById(id, '-password');
        const token = jwt.sign({ email: updatedUser.email, role: updatedUser.role, id: user._id }, process.env.JWT_SECRET);
        return {
            success: true,
            data: {
                user: updatedUser,
                newSession: {
                    token,
                    role: updatedUser.role,
                    email: updatedUser.email,
                    id: updatedUser._id
                }
            },
            message: "User's data updated successfully"
        };
    } else {
        throw new Error("Sorry, cannot update user's data");
    }
}
// Update User

// Get user Detail
const getUserDetail = async (id) => {
    const user = await User.findById(id, '-password').populate('courses', 'name', Course);
    if (user) {
        return { success: true, data: user, message: "User's data fetched successfully." }
    } else {
        throw new Error("Cannot find user.");
    }
}
// Get user Detail

// Change Password
const changePassword = async (id, oldPassword, newPassword) => {
    const user = await User.findById(id);
    if (user) {
        const match = await checkPassword(oldPassword, user.password);
        if (match) {
            const hashedPassword = await encryptPassword(newPassword);
            const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword });
            if (updatedUser) {
                return { success: true, data: updatedUser, message: "Password changed successfully" }
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

// Remove user's old profile picture
const removeOldProfilePic = async (id) => {
    const user = await User.findById(id);

    user.profilePicture && removeImage(user.profilePicture);

}
// Remove user's old profile picture


// Get all course members 
const getAllCourseMembers = async (courses, roles, searchTerm, skip, take) => {
    const users = await User
        .find({
            courses: { '$in': courses },
            role: { '$in': roles },
            name: { '$regex': searchTerm, '$options': 'i' }
        }, '-password -address -contact -zipcode')
        .populate('courses', 'name', Course)
        .skip(skip)
        .limit(take);

    if (users) {
        return { success: true, data: users, message: 'Successfully fetched all the members', hits: users.length }
    } else {
        return { success: false, data: null, message: 'Problem fetching the members.' }
    }
}




module.exports = { loginUser, validateRequest, registerUser, updateUser, getUserDetail, changePassword, getAllCourseMembers }