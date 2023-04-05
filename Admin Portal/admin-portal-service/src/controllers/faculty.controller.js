const asyncWrapper = require("../error/wrapper");
const facultyService = require("../services/faculty.service");

// Create Faculty
const create = asyncWrapper(async (req, res, next) => {
    if (req.body.name) {
        const { success, data, message } = await facultyService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Please provide all the necessary information");
    }
});
// Create Faculty

// Update Faculty
const update = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await facultyService.update(id, req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find faculty, Specify id");
    }
});
// Update Faculty

// Delete Faculty
const deleteFaculty = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await facultyService.deleteFaculty(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find faculty, Select one.");
    }
})
// Delete Faculty

// Get specific Faculty
const getFacultyDetail = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await facultyService.getFacultyDetail(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find faculty, Specify id");
    }
});
// Get specific Faculty

// Get all Faculties
const getAllFaculties = asyncWrapper(async (req, res, next) => {
    const { skip, take, searchTerm } = req.query;
    const { success, data, message, total } = await facultyService.getAllFaculties(skip, take, searchTerm);
    if (success) {
        res.json({ success, data, message, total });
    } else {
        throw new Error(message);
    }
});
// Get all Faculties

// Get all Faculties for dropDown
const getDDFaculties = asyncWrapper(async(req, res, next) => {
    const { success, data, message } = await facultyService.getDDFaculties();
    if(success){
        res.json({success, data, message});
    } else {
        throw new Error(message);
    }
})
// Get all Faculties for dropDown

module.exports = { create, update, getFacultyDetail, getAllFaculties, getDDFaculties, deleteFaculty };