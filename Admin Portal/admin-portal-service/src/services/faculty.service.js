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
const getAllFaculties = async (skip, take, searchTerm) => {
    let allFaculties = await Faculty.find({ name: { "$regex": searchTerm, "$options": "i" } }).skip(skip).limit(take);
    let facultiesCount = await Faculty.count({ name: { "$regex": searchTerm, "$options": "i" } });
    if (allFaculties) {
        return { success: true, data: allFaculties, message: "Successfully fetched all faculties data", total: facultiesCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch any faculties data.", total: 0 }
    }
}
// Get all facultys data

const getDDFaculties = async () => {
    let allFaculties = await Faculty.find({});
    if (allFaculties) {
        allFaculties = allFaculties.map(faculty => ({ id: faculty._id, name: faculty.name }));
        return { success: true, data: allFaculties, message: "Fetched all faculties for drop-down" }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch any faculties for drop-down." }
    }
}

module.exports = { create, update, getFacultyDetail, getAllFaculties, getDDFaculties } 