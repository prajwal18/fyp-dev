const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeStudent, authorizeTeacher } = require("../middleware/auth");
const testAnswerController = require("../controllers/test.answer.controller");


// Create test 
router.post('/create', authenticationMiddleware, authorizeStudent, testAnswerController.createTestAnswer);
// Create test 

// Update test
// To update the test, you need to provied it's id like so
// .../update?id=<--- test's id --->
router.put('/update', authenticationMiddleware, authorizeStudent, testAnswerController.updateTestAnswer);
// Update test

// Grade test
// To Grade the test, you need to provied it's id like so
// .../grade?id=<--- test's id --->
router.put('/grade', authenticationMiddleware, authorizeTeacher, testAnswerController.gradeTestAnswer);
// Grade test

// Get test Details
// To fetch test details, you need to provide it's id like so
// .../get-test?id=<--- test's id --->
router.get('/get-test', authenticationMiddleware, testAnswerController.getTest);
// Get test Details

// Get all tests of a course
// Must provide course details like so
// .../all-test?type=SUBMITTED || GRADED & courseIds= a list of course id's seperated by comma ,
router.get('/all-test', authenticationMiddleware, testAnswerController.getAllTests);
// Get all tests for a user/course


module.exports = router;