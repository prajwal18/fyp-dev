const asyncWrapper = require("../error/wrapper");
const facultyService = require("../services/faculty.service");

// Create Faculty
const create = asyncWrapper(async (req, res, next) => {
    if (req.body.name) {
        const { success, data, message } = facultyService.create(req.body);
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
        const { success, data, message } = await facultyService.update(req.body);
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
    const { success, data, message } = await facultyService.getAllFaculties(id);
    if (success) {
        res.json({ success, data, message });
    } else {
        throw new Error(message);
    }
});
// Get all Faculties

module.exports = { create, update, getFacultyDetail, getAllFaculties };