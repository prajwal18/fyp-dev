//Importing Assignment model
const Assignment = require("../models/assignment.model");
//Importing string to image function (Will replace it with another string to file function)
const { base64toImg } = require("../utils/read.write.image"); // base64toImg will be replaced by another function

// Validate Request
const validateRequest = (data) => {
    if (
        data.title && data.weightage && data.assignedDate && data.dueDate
        && data.description && data.createdBy && data.courseId
    ) {
        return true;
    } else {
        return false;
    }
}
// Validate Request

// Create Assignment
const createAssignment = async (data) => {
    const reqData = JSON.parse(JSON.stringify(data)); // Making a deep copy of an object
    if (reqData.manual) {
        const manualData = await base64toImg(reqData.manual, "assignments"); // base64toIm will be replaced here
        reqData.manual = manualData;
    }
    // Changing the date values
    reqData.assignedDate = new Date(reqData.assignedDate);
    reqData.dueDate = new Date(reqData.dueDate);
    // Changing the date values
    const assignment = await Assignment.create(reqData);
    if (assignment) {
        return { success: true, data: assignment, message: "New assignment created successfully" }
    } else {
        return { success: false, data: null, message: "Sorry cannot create assignment, with the information provided" }
    }
}
// Create Assignment

// Update Assignment
const updateAssignment = async (id, data) => {
    const assignment = await Assignment.findById(id);
    if (assignment) {
        if (!data.dueDate && (new Date(assignment.dueDate).getTime() > Date.now().getTime())) {
            const updatedAssignemnt = await Assignment.findByIdAndUpdate(id, data);
            if (updateAssignment) {
                return { success: true, data: updateAssignment, message: "Assignment updated successfully." }
            } else {
                return { success: false, data: null, message: "Sorry assignment cannot be updated." }
            }

        } else if (new Date(data.dueDate).getTime() > Date.now().getTime()) {
            const updatedAssignemnt = await Assignment.findByIdAndUpdate(id, data);
            if (updateAssignment) {
                return { success: true, data: updateAssignment, message: "Assignment updated successfully." }
            } else {
                return { success: false, data: null, message: "Sorry assignment cannot be updated." }
            }
        } else {
            return { success: false, data: null, message: "You cannot update the assignment after the due date." }
        }
    } else {
        return { success: false, data: null, message: "Sorry cannot find assignment. No match found for the id." }
    }
}
// Update Assignment

// Get Assignment
const getAssignment = async (id) => {
    const assignment = await Assignment.findById(id);
    if (assignment) {
        return { success: true, data: assignment, message: "Assignment fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry the assignment cannot be located." }
    }

}
// Get Assignment

// Get all assignments
const getAllAssignments = async (userId, courseId) => {
    let assignments = null;
    if(userId && courseId){
        assignments = await Assignment.find({createdBy: userId, courseId});
    } else if(userId){
        assignments = await Assignment.find({ createdBy: userId });
    } else if (courseId){
        assignments = await Assignment.find({courseId});
    }

    if (assignments) {
        return { success: true, data: assignments, message: "Assignments fetched successfully." }
    } else {
        return { success: false, data: null, message: "Sorry no assignments could be found." }
    }

}
// Get all assignments

module.exports = { validateRequest, createAssignment, updateAssignment, getAssignment, getAllAssignments };

