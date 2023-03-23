const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeTeacher } = require("../middleware/auth");
const testController = require("../controllers/test.paper.controller");


// Create test 
router.post('/create', authenticationMiddleware, authorizeTeacher, testController.createTestPaper);
// Create test 

// Update test
// To update the test, you need to provied it's id like so
// .../update?id=<--- test's id --->
router.put('/update', authenticationMiddleware, authorizeTeacher, testController.updateTestPaper);
// Update test

// Get test Details
// To fetch test details, you need to provide it's id like so
// .../get-test?id=<--- test's id --->
router.get('/get-test', authenticationMiddleware, testController.getTest);
// Get test Details

// Get all tests of a course
// Must provide course details like so
// .../all-test?courseIds=courses seperated by commas ,
router.get('/all-test', authenticationMiddleware, authorizeTeacher, testController.getAllTests);
// Get all tests for a user/course

// Get all released tests of a course
// Must provide course details like so
// .../all-released-test?courseIds=courses seperated by commas ,
router.get('/all-released-test', authenticationMiddleware, testController.getAllReleasedTests);
// Get all released tests of a course





module.exports = router;