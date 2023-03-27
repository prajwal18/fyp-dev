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






module.exports = router;