const { UserRole } = require("../constants/enum");
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
        if (req.body.newPassword) {
            const { success, data, message } = await userService.changePassword(id, req.body.newPassword);
            if (success) {
                res.json({ success, data, message });
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please provide new password.");
        }
    } else {
        throw new Error("Cannot find user, Specify id");
    }
});
// Change Password

// Get all Teachers
const getAllTeachers = asyncWrapper(async (req, res, next) => {
    const { skip, take, searchTerm, course, purpose } = req.query;
    if (course) {
        const { success, data, message, total } = await userService.fetchCourseUsers(skip, take, searchTerm, course, purpose, UserRole[1]);
        if (success) {
            res.json({ success, data, message, total });
        } else {
            throw new Error(message);
        }
    } else {
        const { success, data, message, total } = await userService.fetchAllTeachers(skip, take, searchTerm);
        if (success) {
            res.json({ success, data, message, total });
        } else {
            throw new Error(message);
        }
    }
});
// Get all Teachers

// Get all Students
const getAllStudents = asyncWrapper(async (req, res, next) => {
    const { skip, take, searchTerm, course, purpose } = req.query;
    if (course) {
        const { success, data, message, total } = await userService.fetchCourseUsers(skip, take, searchTerm, course, purpose, UserRole[0]);
        if (success) {
            res.json({ success, data, message, total });
        } else {
            throw new Error(message);
        }
    } else {
        const { success, data, message, total } = await userService.fetchAllStudents(skip, take, searchTerm);
        if (success) {
            res.json({ success, data, message, total });
        } else {
            throw new Error(message);
        }
    }
});
// Get all Students


// Add user to course 
const addUserToCourse = asyncWrapper(async (req, res, next) => {
    const { course, user, role } = req.body;
    if (course && user) {
        const { success, data, message } = await userService.addUserToCourse(user, course, role);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Provide the course, user and user role.");
    }
});

// Remove user from course
const removeUserFromCourse = asyncWrapper(async (req, res, next) => {
    const { course, user, role } = req.body;
    if (course && user) {
        const { success, data, message } = await userService.removeUserFromCourse(user, course, role);
        console.log(success, data, message);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Provide the course, user and user role.");
    }
});



module.exports = {
    userRegistration, userUpdate,
    userDetail, changePassword,
    getAllTeachers, getAllStudents,
    addUserToCourse, removeUserFromCourse
}