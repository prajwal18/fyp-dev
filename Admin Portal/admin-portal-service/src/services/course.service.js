const Course = require("../models/course.model");

// Create Course
const create = async (courseData) => {
    const course = await Course.create(courseData);
    if (course) {
        return { success: true, data: course, message: "Course created successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot create course." }
    }
}
// Create Course

// Update Course
const update = async (id, courseData) => {
    const updatedCourse = await Course.findByIdAndUpdate(id, courseData);
    if (updatedCourse) {
        return { success: true, data: updatedCourse, message: "Course's data updated successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot find course." }
    }
}
// Update Course

// Get specific course deatil
const getCourseDetail = async (id) => {
    const course = await Course.findById(id);
    if (course) {
        return { success: true, data: course, message: "Fetched course successfully." }
    }
}
// Get specific course deatil

// Get all courses data
const getAllCourses = async (skip, take, searchTerm) => {
    let allCourses = await Course.find({ name: { "$regex": searchTerm, "$options": "i" } }).skip(skip).limit(take);
    let coursesCount = await Course.count({ name: { "$regex": searchTerm, "$options": "i" } });
    if (allCourses) {
        return { success: true, data: allCourses, message: "Successfully fetched all courses data", total: coursesCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch any courses data.", total: 0 }
    }
}
// Get all courses data


// Get all courses data
const getFacultyCourses = async (skip, take, searchTerm, facultyId) => {
    let allCourses = await Course
        .find({ name: { "$regex": searchTerm, "$options": "i" }, faculty: facultyId })
        .skip(skip).limit(take);

    let coursesCount = await Course
        .count({ name: { "$regex": searchTerm, "$options": "i" }, faculty: facultyId });
    if (allCourses) {
        return { success: true, data: allCourses, message: "Successfully fetched all courses data", total: coursesCount }
    } else {
        return { success: false, data: null, message: "Sorry, cannot fetch any courses data.", total: 0 }
    }
}
// Get all courses data


module.exports = {
    create, update, getCourseDetail,
    getAllCourses, getFacultyCourses
};