const express = require('express');
const router = express.Router();
// Importing user controller
const userController = require("../controllers/user.controller");
const { authenticationMiddleware, authorizeSameUser } = require("../middleware/auth");


// User Login
router.post("/auth/login", userController.userLogin);

// User Registratino
router.post("/auth/register", userController.userRegistration);

// Update user details
// Note must provide user's id as ../update?id=<--- user's id --->
router.put("/update", authenticationMiddleware, authorizeSameUser, userController.userUpdate);

// Get user details
// Note must provide user's id as ../get-details?id=<--- user's id --->
router.get("/get-details", authenticationMiddleware, authorizeSameUser, userController.userDetail);

// Change password
// Note must provide user's id as ../change-password?id=<--- user's id --->
router.put("/change-password", authenticationMiddleware, authorizeSameUser, userController.changePassword);

// Get all course members for a specific user. 
// Note only returns the members of the course the user's enlisted in. 
router.get("/get-all-course-members", authenticationMiddleware, userController.getAllCourseMembers);

/*
Note: To update and retirve user's information, a middleware is needed
to authorize the same user access.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;