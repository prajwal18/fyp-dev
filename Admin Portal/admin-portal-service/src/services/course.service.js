const Course = require("../models/course.model");

// Create Course
const create = async (courseData) => {
    const course = await Course.create(courseData);
    if( course ){
        return { success: true, data: course, message: "Course created successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot create course." }
    }
}
// Create Course

// Update Course
const update = async ( id, courseData ) => {
    const updatedCourse = await Course.findByIdAndUpdate(id, courseData);
    if(updatedCourse){
        return { success: true, data: updatedCourse, message: "Course's data updated successfully." }
    } else {
        return { success: false, data:null, message: "Sorry, cannot update course." } 
    }
}
// Update Course

// Get specific course deatil
const getCourseDetail = async ( id ) => {
    const course = await Course.findById(id);
    if(course){
        return { success: true, data: course, message: "Fetched course successfully." } 
    }
}
// Get specific course deatil

// Get all courses data
const getAllCourses = async () => {
    const allCourses = await Course.find({ });
    if(allCourses){
        return { success: true, data: allCourses, message: "All course data fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot find any courses." }
    }
}
// Get all courses data

module.exports = { create, update, getCourseDetail, getAllCourses };