const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeTeacher, authorizeStudent } = require("../middleware/auth");
const statsController = require("../controllers/stats.controller");


// Get Header Info
/* 
    Header Info contains the number of courses the user's resitered in, 
    Students & teachers in his/her courses, 
    Test and Assignments submitted and graded in those courses
*/
// To get the head-info of a user you need to provide their id like so
router.get('/head-info', authenticationMiddleware, statsController.getHeadInfo);
// Get Header Info

// Get Course Stats
/*
    Returns and data representing number all the courses available
    and the number of courses the user is registered in.
*/
router.get('/course-stat', authenticationMiddleware, statsController.getCourseStat);
// Get Course Stats

// Fetch Assignment Stats
router.get('/assignment-stat', authenticationMiddleware, statsController.getAssignmentStat);
// Fetch Assignment Stats


// Fetch Test Stats
router.get('/test-stat', authenticationMiddleware, statsController.getTestStat);
// Fetch Test Stats


// Get test result data
/*
    To get the test result data you need to provide the following parameters:
    studentIds, courseIds, take
*/
router.get("/test-progress", authenticationMiddleware, statsController.getTestProgress);
// Get test result data


// Get assignment result data
/*
    To get the assignment result data you need to provide the following parameters:
    studentIds, courseIds, take
*/
router.get("/assignment-progress", authenticationMiddleware, statsController.getAssignmentProgress);
// Get test result data




module.exports = router;