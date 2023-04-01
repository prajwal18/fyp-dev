const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware, authorizeStudent, authorizeTeacher } = require("../middleware/auth");
const testAnswerController = require("../controllers/test.answer.controller");

// Check if test answer exists
router.get('/check', authenticationMiddleware, testAnswerController.testAnswerExists)
// Check if test answer exists

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

// Delete Test answer paper
// To delete the test, you need to provide it's id like os
// .../delete?id=<-- Test's id -->
router.delete("/delete", authenticationMiddleware, authorizeTeacher, testAnswerController.deleteTestAnswer);

// Get test Details
// To fetch test details, you need to provide it's id like so
// .../get-test?id=<--- test's id --->
router.get('/get-test', authenticationMiddleware, testAnswerController.getTest);
// Get test Details

router.get('/get-all-specific', authenticationMiddleware, testAnswerController.getAllSpecificTests);


module.exports = router;