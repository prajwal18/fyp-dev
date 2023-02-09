const asyncWrapper = require("../error/wrapper");
const assignmentService = require("../services/assignment.service");

// Create Assignment
const create = asyncWrapper(async ( req, res, next) => {
    const isReqValid = assignmentService.validateRequest(req.body);
    if(isReqValid){
        const { success, data, message } = await assignmentService.createAssignment(req.body);  
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Bad Request, Provide all the necessary parameters");
    }
});
// Create Assignment

// Update Assignment
const update = asyncWrapper(async ( req, res, next) => {
    const id = req.query.id; // To identify the assignment to be updated
    if(id){
        const { success, data, message } = await assignmentService.updateAssignment(id, req.body);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find assignment. Id query is missing.");
    }
});
// Update Assignment

// Get Assignment
const getAssignment = asyncWrapper(async ( req, res, next) => {
    const id = req.query.id; // To identify the assignment to be fetched
    if(id){
        const { success, data, message } = await assignmentService.getAssignment(id);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find assignment. Id query is missing.");
    }
});
// Get Assignment

// Get All Assignments
const getAllAssignments = asyncWrapper(async ( req, res, next) => {
    const { userId, courseId } = req.query.id;
    if(userId || courseId){
        const { success, data, message } = await assignmentService.getAllAssignments(userId, courseId);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new error(message);
        }
    } else {
        throw new Error("User id and course id both are missing, cannot identify the assignment.");
    }
});
// Get All Assignments


module.exports = { create, update, getAssignment, getAllAssignments }