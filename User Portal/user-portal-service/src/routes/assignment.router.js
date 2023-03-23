const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeTeacher } = require("../middleware/auth");
const assignmentController = require("../controllers/assignment.controller");

// Create Assignment 
router.post('/create', authenticationMiddleware, authorizeTeacher, assignmentController.create );
// Create Assignment 

// Update Assignment
// To update the assignment, you need to provied it's id like so
// .../update?id=<--- Assignment's id --->
router.post('/update', authenticationMiddleware, authorizeTeacher, assignmentController.update );
// Update Assignment

// Get assignment Details
// To fetch assignment details, you need to provide it's id like so
// .../get-assignment?id=<--- Assignment's id --->
router.get('/get-assignment', authenticationMiddleware, assignmentController.getAssignment );
// Get assignment Details

// Get all assignments for a user/course
// Must provide course Id
// .../all-assignments?courseIds=<---Course's Id--->
router.get('/all-assignment', authenticationMiddleware, assignmentController.getAllAssignments );
// Get all assignments for a user/course

// Get all released assignments for a user/course
// Must provide course Id
// .../all-assignments?courseIds=<---Course's Id--->
router.get('/all-released-assignment', authenticationMiddleware, assignmentController.getAllReleasedAssignments );
// Get all assignments for a user/course



module.exports = router;