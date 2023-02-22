const asyncWrapper = require("../error/wrapper");
const courseService = require("../services/course.service");


// Create Course
const create = asyncWrapper(async (req, res, next) => {
    if (req.body.name && req.body.description && req.body.faculty) {
        const { success, data, message } = await courseService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Please provide all the necessary information.");
    }
});
// Create Course

// Update Course
const update = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await courseService.update(id, req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Specify the course's id");
    }
});
// Update Course

// Get single course Detail
const getCourseDetail = asyncWrapper(async (req, res, next) => {
    const id = req.query.id;
    if (id) {
        const { success, data, message } = await courseService.getCourseDetail(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find course, Specify id");
    }
})
// Get single course Detail

// Get all courses
const getAllCourses = asyncWrapper(async (req, res, next) => {
    const { skip, take, searchTerm } = req.query;
    const { success, data, message, total } = await courseService.getAllCourses(skip, take, searchTerm);
    if (success) {
        res.json({ success, data, message, total });
    } else {
        throw new Error("Sorry, cannot fetch courses data.");
    }
})
// Get all courses

module.exports = { create, update, getCourseDetail, getAllCourses };