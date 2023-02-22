const express = require('express');
const router = express.Router();
// Importing user controller
const adminController = require("../controllers/admin.controller");
const { authenticationMiddleware, authorizeAdmin } = require("../middleware/auth");


// Admin Login
router.post("/auth/login", adminController.adminLogin);

// Admin Registratino
router.post("/auth/register", adminController.adminRegistration);

// Update admin details
// Note must provide admin's id as ../update?id=<--- admin's id --->
router.put("/update", authenticationMiddleware, authorizeAdmin, adminController.adminUpdate); 

// Get admin details
// Note must provide admin's id as ../get-details?id=<--- admin's id --->
router.get("/get-details", authenticationMiddleware, authorizeAdmin, adminController.adminDetail);

// Get all admin details
router.get("/get-all-admin", authenticationMiddleware, authorizeAdmin, adminController.getAllAdmin);

// Change password
// Note must provide admin's id as ../change-password?id=<--- admin's id --->
router.put("/change-password", authenticationMiddleware, authorizeAdmin, adminController.changePassword);

// Delete admin
// Note must provide admin's id as ../delete-admin?id=<--- admin's id --->
router.delete("/delete", authenticationMiddleware, authorizeAdmin, adminController.deleteAdmin);


/*
Note: To update and retirve user's information, a middleware is needed
to authorize the same user access.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;