const { UserRole } = require("../constants/enum");
const Course = require("../models/course.model");
const User = require("../models/user.model");

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
    const course = await Course.findById(id).populate('faculty', 'name');
    const teachers = await User.count({
        courses: { '$in': [id] },
        role: UserRole[1]
    });
    const students = await User.count({
        courses: { '$in': [id] },
        role: UserRole[0]
    });
    if (course) {
        return {
            success: true,
            data: {
                _id: course._id,
                name: course.name,
                faculty: course.faculty,
                description: course.description,
                createdAt: course.createdAt,
                teachers: teachers,
                students: students
            },
            message: "Fetched course successfully."
        }
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


// Delete Course
const deleteCourse = async (id) => {
    const users = await User.find({
        courses: {
            '$in': [id]
        }
    });
    if (users?.length) {
        return {
            success: false, data: null, message: `Sorry, cannot delete course with (${users.length}) users.`
        }
    } else {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (deletedCourse) {
            return { success: true, data: deletedCourse, message: 'Course deleted successfully' }
        } else {
            return { success: false, data: null, message: 'Sorry, cannot find the course.' }
        }
    }
}
// Delete Course


module.exports = {
    create, update, getCourseDetail,
    getAllCourses, getFacultyCourses,
    deleteCourse
};