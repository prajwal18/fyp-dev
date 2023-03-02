//Importing User model
const User = require("../models/user.model");
const Course = require("../models/course.model");
const { UserRole } = require("../constants/enum");
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
    // User cannot upload user's image
    delete userData.profilePicture;
    delete userData.coverPicture;
    // User cannot upload user's image

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

    // User cannot upload user's image
    delete userData.profilePicture;
    delete userData.coverPicture;
    delete userData.password;           // Also there's a seperate API to update password
    // User cannot upload user's image

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
    if (allUsers) {
        return { success: false, data: allUsers, message: "All users retrived successfully" }
    } else {
        return { success: false, data: null, message: "Sorry, can't find any users" }
    }
}
// Get all users

// Get all Teacher
const fetchAllTeachers = async (skip, take, searchTerm) => {
    let allTeacher = await User.find({ name: { "$regex": searchTerm, "$options": "i" }, role: UserRole[1] }).skip(skip).limit(take);
    let teachersCount = await User.count({ name: { "$regex": searchTerm, "$options": "i" }, role: UserRole[1] });

    if (allTeacher) {
        return { success: true, data: allTeacher, message: "Successfully fetched all students data", total: teachersCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch students list", total: 0 }
    }
}
// Get all Teacher

// Get all Student
const fetchAllStudents = async (skip, take, searchTerm) => {
    let allStudent = await User.find({ name: { "$regex": searchTerm, "$options": "i" }, role: UserRole[0] }).skip(skip).limit(take);
    let studentsCount = await User.count({ name: { "$regex": searchTerm, "$options": "i" }, role: UserRole[0] });
    if (allStudent) {
        return { success: true, data: allStudent, message: "Successfully fetched all students data", total: studentsCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch students list", total: 0 }
    }
}
// Get all Student



// Enroll and Disenroll users from course
const addUserToCourse = async (userId, courseId, role) => {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);


    if (user && course) {
        if (user.role === role) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    '$addToSet': {
                        courses: [courseId]
                    }
                }
            );
            if (updatedUser) {
                return { success: true, data: updatedUser, message: `${user.name} successfully added to ${course.name}` }
            } else {
                return { success: false, data: null, message: 'Cannot add user to course.' }
            }
        } else {
            return { success: false, data: null, message: `Incorrect user role specified.` }
        }
    } else if (user) {
        return { success: false, data: null, message: `Cannot find course.` }
    } else {
        return { success: false, data: null, message: "Cannot find user." }
    }
}

const removeUserFromCourse = async (userId, courseId, role) => {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (user && course) {
        if (user.role === role) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    '$pullAll': {
                        courses: [courseId]
                    }
                }
            );
            if (updatedUser) {
                return { success: true, data: updatedUser, message: `${updatedUser.name} successfully removed from ${course.name}` }
            } else {
                return { success: false, data: null, message: 'Cannot remove user from course.' }
            }
        }
        else {
            return { success: false, data: null, message: `Incorrect user role specified.` }
        }
    } else if (user) {
        return { success: false, data: null, message: `Cannot find course.` }
    } else {
        return { success: false, data: null, message: "Cannot find user." }
    }
}


// Fetch course Teachers
const fetchCourseUsers = async (skip, take, searchTerm, course, purpose, role) => {
    const courseData = await Course.findById(course);
    if (courseData) {
        if (purpose === 'ADD') {
            const users = await User.find({
                name: { '$regex': searchTerm, "$options": "i" },
                role: role,
                "courses": { "$ne": course } // Not equal to course
            }).skip(skip).limit(take);
            if (users) {
                return { success: true, data: users, message: `Retrived all users who aren't enrolled in ${courseData.name}`, total: users.length }
            } else {
                return { success: false, data: null, message: `Unable to retrive users `, total: 0 }
            }
        } else {
            const users = await User.find({
                name: { '$regex': searchTerm, "$options": "i" },
                role: role,
                "courses": {"$in": course}
            }).skip(skip).limit(take);

            if (users) {
                return { success: true, data: users, message: `Retrived all users from ${courseData.name}`, total: users.length }
            } else {
                return { success: false, data: null, message: `Unable to retrive users from ${courseData.name}`, total: 0 }
            }
        }
    } else {
        return { success: false, data: null, message: "Cannot find course", total: 0 }
    }
}
// Fetch course Teachers



module.exports = {
    validateRequest, registerUser,
    updateUser, getUserDetail,
    getAllUsers, changePassword,
    fetchAllStudents, fetchAllTeachers,
    addUserToCourse, removeUserFromCourse,
    fetchCourseUsers
}