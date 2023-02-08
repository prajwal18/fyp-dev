const express = require('express');
const router = express.Router();
// Importing user controller
const facultyController = require("../controllers/faculty.controller");
const { authenticationMiddleware, authorizeAdmin } = require("../middleware/auth");


// Create Faculty
router.post("/create", authenticationMiddleware, authorizeAdmin, facultyController.create );

// Update Faculty Details
router.post("/update", authenticationMiddleware, authorizeAdmin, facultyController.update );

// Fetch Faculty Details
router.get("/faculty-details", authenticationMiddleware, authorizeAdmin, facultyController.getFacultyDetail );

// Fetch all Faculty Details
router.get("/all-faculties", authenticationMiddleware, authorizeAdmin, facultyController.getAllFaculties );

// Delete course
// ----------------- DELETE COURSE API -----------------



/*
Note: To create, update, retrive and delete a Faculty, a middleware
is needed to authorize the admin with those privileges.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;

module.exports = router;