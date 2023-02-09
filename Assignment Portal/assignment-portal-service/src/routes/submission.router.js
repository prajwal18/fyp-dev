const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeTeacher, authorizeStudent } = require("../middleware/auth");
const submissionController = require("../controllers/submission.controller");

// Submit Assignment Submission
router.post("/submit",  authenticationMiddleware, authorizeStudent, submissionController.submit);
// Submit Assignment Submission


// Grade Submission
// provide submission id as such .../grade-submission?id=<---submission id--->
router.post('/grade-sbmission', authenticationMiddleware, authorizeTeacher, submissionController.grade);
// Grade Submission

// Get specific submission
// provide submission id as such .../get-submission?id=<--- submission id --->
router.get('/get-submission', authenticationMiddleware, submissionController.getSubmission);
// Get specific submission

// Get all submissions
// Note between studentId or assignmentId one is required the other is optional
// provide user id and course id as such .../all-assignments?studentId=<---User's Id--->&assignmentId=<---Course's Id--->
router.get('/all-submission', authenticationMiddleware, submissionController.getAllSubmissions);
// Ger all submissions

module.exports = router;