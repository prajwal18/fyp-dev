const express = require('express');
const router = express.Router();
// Importing user controller
const userController = require("../controllers/user.controller");
const { authenticationMiddleware, authorizeAdmin } = require("../middleware/auth");


// User Registratino
router.post("/auth/register", authenticationMiddleware, authorizeAdmin, userController.userRegistration);

// Update user details
// Note must provide user's id as ../update?id=<--- user's id --->
router.put("/update", authenticationMiddleware, authorizeAdmin, userController.userUpdate); 

// Get user details
// Note must provide user's id as ../user?id=<--- user's id --->
router.get("/get-details", authenticationMiddleware, authorizeAdmin, userController.userDetail);

// Change password
// Note must provide user's id as ../change-password?id=<--- user's id --->
router.put("/change-password", authenticationMiddleware, authorizeAdmin, userController.changePassword);

// Get all teacher's details
router.get("/all-teachers", authenticationMiddleware, authorizeAdmin, userController.getAllTeachers );

// Get all student's details
router.get("/all-students", authenticationMiddleware, authorizeAdmin, userController.getAllStudents );

// Add user to course
router.put("/enroll", authenticationMiddleware, authorizeAdmin, userController.addUserToCourse );

// Remove user from course
router.put("/disenroll", authenticationMiddleware, authorizeAdmin, userController.removeUserFromCourse );

/*
Note: To update and retirve user's information, a middleware is needed
to authorize the same user access.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;