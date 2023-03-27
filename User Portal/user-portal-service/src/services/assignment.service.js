//Importing Assignment model
const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");
//Importing string to image function (Will replace it with another string to file function)
const { base64ToPdf, removePdf } = require("../utils/read.write.pdf"); // base64ToPdf will be replaced by another function

// Validate Request
const verifyCreateRequest = (data) => {
    if (
        data.title && data.releaseDate && data.dueDate && data.fullMark
        && data.description && data.createdBy && data.courseId
    ) {
        return { isVerified: true, isVerifiedMessage: null };
    } else {
        return { isVerified: false, isVerifiedMessage: 'Provide all the required fields.' };
    }
}
// Validate Request

// Validate Update request
const verifyUpdateRequest = async (id) => {
    const assignment = await Assignment.findById(id);
    if (assignment) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(assignment.dueDate);
        if (today.getTime() <= dueDate.getTime()) {
            return {
                isVerified: true,
                isVerifiedMessage: null
            }
        } else {
            return {
                isVerified: false,
                isVerifiedMessage: 'You cannot update a assignment past it\'s due date.'
            }
        }
    } else {
        return {
            isVerified: false,
            isVerifiedMessage: 'Cannot find the Assignment.'
        }
    }
}
// Validate Update request

// Create Assignment
const create = async (data) => {
    if (data.manual) {
        const manualDataPath = await base64ToPdf(data.manual, "assignments"); // base64toIm will be replaced here
        data.manual = manualDataPath;
    }
    const assignment = await Assignment.create(data);
    if (assignment) {
        return { success: true, data: assignment, message: "New assignment created successfully." }
    } else {
        return { success: false, data: null, message: "Sorry cannot create assignment, with the information provided" }
    }
}
// Create Assignment

// Update Assignment
const update = async (data, id) => {
    const assignment = await Assignment.findById(id);
    if (data.manual) {
        const manualDataPath = await base64ToPdf(data.manual, "assignments"); // base64toIm will be replaced here
        data.manual = manualDataPath;
        if(assignment.manual){
            removePdf(assignment.manual);
        }
    }
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, data);
    if (updatedAssignment) {
        return { success: true, data: updatedAssignment, message: "Assignment updated successfully." }
    } else {
        return { success: false, data: null, message: "Problem updating Assignment." }
    }
}
// Update Assignment

// Get Assignment
const getAssignment = async (id) => {
    const assignment = await Assignment.findById(id)
    .populate('createdBy', 'name', User)
    .populate('courseId', 'name', Course);
    if (assignment) {
        return { success: true, data: assignment, message: "Assignment fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry cannot find the assignment." }
    }
}
// Get Assignment
module.exports = { verifyCreateRequest, verifyUpdateRequest, create, update, getAssignment};

