//Importing User model
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Assignment = require("../models/assignment.model");
const Submission = require("../models/assignment.submission.model")
const Test = require("../models/test.question.model");
const TestAnswer = require("../models/test.answer.model");
const Conversation = require("../models/conversation.model");
const { UserRole } = require("../constants/enum");
//Importing password creation and comparision functions
const { encryptPassword } = require("../utils/encrypt.decrypt.password");
const conversationModel = require("../models/conversation.model");


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
    const user = await User.findById(id, '-password');
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
                "courses": { "$in": course }
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



// Check doucuments
const checkDocuments = async (id) => {
    const user = await User.findById(id);
    // User role [0] ==> Student, [1] ==> Teacher
    if (user) {
        if (user.role === UserRole[0]) {
            const submissions = await Submission.find({
                submittedBy: id
            });
            const testAnswers = await TestAnswer.find({
                submittedBy: id
            })

            if (submissions?.length || testAnswers?.length) {
                return { success: true, data: null, message: `User has ${submissions?.length || 0} assignment submissions and ${testAnswers?.length || 0} test submissions.` }
            } else {
                return { success: false, data: null, message: 'User has no associated documents.' }
            }
        } else {
            const assignments = await Assignment.find({
                createdBy: id
            });
            const tests = await Test.find({
                createdBy: id
            });
            const submissions = await Submission.find({
                gradedBy: id
            });
            const testAnswers = await TestAnswer.find({
                gradedBy: id
            })

            if (assignments?.length || tests?.length || submissions?.length || testAnswers?.length) {
                return { success: true, data: null, message: `User has created ${assignments?.length || 0} assignments and ${tests?.length || 0} tests. .User has graded ${submissions?.length || 0} assignment submissions and ${testAnswers?.length || 0} test submissions.` }
            } else {
                return { success: false, data: null, message: 'User has no associated documents.' }
            }
        }
    } else {
        return { success: false, data: null, message: "Cannot find user" }
    }
}
// Check doucuments


// Delete user
const deleteUser = async (id) => {
    await Conversation.deleteMany({
        users: { '$in': [id] }
    });
    const tests = await Test.find({ createdBy: id });
    const testPaperIds = tests?.map(test => test._id) || [];
    const assignments = await Assignment.find({ createdBy: id });
    const assignmentIds = assignments?.map(assignment => assignment._id) || [];


    /// Deleting user's associated documents
    await TestAnswer.deleteMany({
        '$or': [{ submittedBy: id }, { gradedBy: id }, { testPaperId: { '$in': testPaperIds } }]
    });
    await Submission.deleteMany({
        '$or': [{ submittedBy: id }, { gradedBy: id }, { assignmentId: { '$in': assignmentIds } }]
    })
    await Test.deleteMany({
        createdBy: id
    });
    await Assignment.deleteMany({
        createdBy: id
    });
    /// Deleting user's associated documents

    
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
        return { success: true, data: deletedUser, message: "User deleted successfully." }
    } else {
        return { success: false, data: null, message: "User deleted successfully." }
    }
}
// Delete user


module.exports = {
    validateRequest, registerUser,
    updateUser, getUserDetail,
    getAllUsers, changePassword,
    fetchAllStudents, fetchAllTeachers,
    addUserToCourse, removeUserFromCourse,
    fetchCourseUsers, checkDocuments,
    deleteUser

}