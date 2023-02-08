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
router.post("/update", authenticationMiddleware, authorizeSameUser, userController.userUpdate); 

// Get user details
// Note must provide user's id as ../user?id=<--- user's id --->
router.get("/get-details", authenticationMiddleware, authorizeSameUser, userController.userDetail);

// Change password
// Note must provide user's id as ../change-password?id=<--- user's id --->
router.post("/change-password", authenticationMiddleware, authorizeSameUser, userController.changePassword);


/*
Note: To update and retirve user's information, a middleware is needed
to authorize the same user access.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;