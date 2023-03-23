const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeTeacher, authorizeStudent } = require("../middleware/auth");
const assignmentSubmissionController = require("../controllers/assignment.submission.controller");

// Create Assignment Submission
router.post("/create",  authenticationMiddleware, authorizeStudent, assignmentSubmissionController.create);
// Create Assignment Submission

// Update assignment submission
// To update the assignment submission, you need to provie it's id like so.
// .../update?id=< --- assignment submission's id --- >
router.put("/update", authenticationMiddleware, authorizeStudent, assignmentSubmissionController.update);
// Update assignment submission

// Grade assignment submission
// To grade the assignment submission, you need to provie it's id like so.
// .../grade?id=< --- assignment submission's id --- >
router.put("/grade", authenticationMiddleware, authorizeTeacher, assignmentSubmissionController.grade);
// Grade assignment submission

// Get specific submission
// provide submission id as such .../get-submission?id=<--- submission id --->
router.get('/get-submission', authenticationMiddleware, assignmentSubmissionController.getSubmission);
// Get specific submission

// Get all submissions
// Must provide course details like so
// .../all-submission?type=SUBMITTED || GRADED & courseIds= a list of course id's seperated by comma ,
router.get('/all-submission', authenticationMiddleware, assignmentSubmissionController.getAllSubmissions);
// Ger all submissions

module.exports = router;