//Importing Assignment model
const Assignment = require("../models/assignment.model");
//Importing string to image function (Will replace it with another string to file function)
const { base64toImg } = require("../utils/read.write.image"); // base64toImg will be replaced by another function

// Validate Request
const verifyCreateRequest = (data) => {
    if (
        data.title && data.weightage && data.assignedDate && data.dueDate
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
        const dueDate = new Date(assignment.dueDate + ' 00:00: 00');
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
const createAssignment = async (data) => {
    if (data.manual) {
        const manualDataPath = await base64toImg(data.manual, "assignments"); // base64toIm will be replaced here
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
const updateAssignment = async (data, id) => {
    const assignment = await Assignment.findById(id);
    if (assignment) {

        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(assignment.dueDate + ' 00:00: 00');

        if (today.getTime() <= dueDate.getTime()) {
            if (data.manual) {
                assignment.manual // remove assignment.manual first
                const manualDataPath = await base64toImg(data.manual, "assignments"); // base64toIm will be replaced here
                data.manual = manualDataPath;
            }
            const updatedAssignemnt = await Assignment.findByIdAndUpdate(id, data);
            if (updatedAssignemnt) {
                return { success: true, data: updatedAssignemnt, message: "Assignment updated successfully." }
            } else {
                return { success: false, data: null, message: "Sorry assignment cannot be updated." }
            }

        } else {
            return { success: false, data: null, message: "You cannot update the assignment after the due date." }
        }
    } else {
        return { success: false, data: null, message: "Sorry cannot find the assignment." }
    }
}
// Update Assignment

// Get Assignment
const getAssignment = async (id) => {
    const assignment = await Assignment.findById(id);
    if (assignment) {
        return { success: true, data: assignment, message: "Assignment fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry cannot find the assignment." }
    }
}
// Get Assignment

// Get all assignments
const getAllAssignments = async (courses) => {
    const assignments = await Assignment.find({
        courseId: { '$in': courses }
    });
    if (assignments) {
        return { success: true, data: assignments, message: "Assignments fetched successfully.", hits: assignments.length }
    } else {
        return { success: false, data: null, message: "Sorry cannot fetch assignments.", hits: 0 }
    }
}
// Get all assignments


// Get all assignments
const getAllReleasedAssignments = async (courses) => {
    const assignments = await Assignment.find({
        courseId: { '$in': courses }
    });
    if (assignments) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const releasedAssignments = assignments.filter(assignment => {
            const releaseDate = new Date(assignment.releaseDate + ' 00:00:00');
            return today >= releaseDate;
        });
        return { success: true, data: releasedAssignments, message: "Assignments fetched successfully.", hits: releasedAssignments.length }
    } else {
        return { success: false, data: null, message: "Sorry cannot fetch assignments.", hits: 0 }
    }
}
// Get all assignments

module.exports = { verifyCreateRequest, verifyUpdateRequest, createAssignment, updateAssignment, getAssignment, getAllAssignments, getAllReleasedAssignments };

