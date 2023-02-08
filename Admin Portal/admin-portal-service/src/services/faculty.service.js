const Faculty = require("../models/faculty.model");

// Create faculty
const create = async (facultyData) => {
    const faculty = await Faculty.create(facultyData);
    if (faculty) {
        return { success: true, data: faculty, message: "New faculty created successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot create new faculty." }
    }
}
// Create faculty

// Update faculty
const update = async (id, facultyData) => {
    const updatedfaculty = await Faculty.findByIdAndUpdate(id, facultyData);
    if (updatedfaculty) {
        return { success: true, data: updatedfaculty, message: "Faculty's data updated successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot update faculty." }
    }
}
// Update faculty

// Get specific faculty deatil
const getFacultyDetail = async (id) => {
    const faculty = await Faculty.findById(id);
    if (faculty) {
        return { success: true, data: faculty, message: "Fetched faculty successfully." }
    }
}
// Get specific faculty deatil

// Get all facultys data
const getAllFaculties = async () => {
    const allFaculties = await Faculty.find({});
    if (allFaculties) {
        return { success: true, data: allFaculties, message: "All faculty data fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot find any faculties." }
    }
}
// Get all facultys data

module.exports = { create, update, getFacultyDetail, getAllFaculties } 