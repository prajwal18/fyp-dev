const express = require('express');
const router = express.Router();
// Importing user controller
const courseController = require("../controllers/course.controller");
const { authenticationMiddleware, authorizeAdmin } = require("../middleware/auth");


// Create Course
router.post("/create", authenticationMiddleware, authorizeAdmin, courseController.create );

// Update Course Details
router.post("/update", authenticationMiddleware, authorizeAdmin, courseController.update );

// Fetch specific Course Details
router.get("/course-details", authenticationMiddleware, authorizeAdmin, courseController.getCourseDetail );

// Fetch all course details
router.get("/all-courses", authenticationMiddleware, authorizeAdmin, courseController.getAllCourses );

// Delete course
// ----------------- DELETE COURSE API -----------------



/*
Note: To create, update, retrive and delete a course, a middleware
is needed to authorize the admin with those privileges.

Authentication middleware will only authorize requests with JWT token present
*/

module.exports = router;