const express = require('express');
const router = express.Router();
// Importing user controller
const facultyController = require("../controllers/faculty.controller");
const { authenticationMiddleware, authorizeAdmin } = require("../middleware/auth");

// Create Faculty
router.post("/create", authenticationMiddleware, authorizeAdmin, facultyController.create );

// Update Faculty Details
router.put("/update", authenticationMiddleware, authorizeAdmin, facultyController.update );

// Fetch Faculty Details
router.get("/faculty-details", authenticationMiddleware, authorizeAdmin, facultyController.getFacultyDetail );

// Fetch all Faculty Details
router.get("/all-faculties", authenticationMiddleware, authorizeAdmin, facultyController.getAllFaculties );

// Fetch all Faculties for DropDown
router.get("/dd-faculties", authenticationMiddleware, authorizeAdmin, facultyController.getDDFaculties);

// Delete Faculty api
router.delete("/delete", authenticationMiddleware, authorizeAdmin, facultyController.deleteFaculty);

module.exports = router;