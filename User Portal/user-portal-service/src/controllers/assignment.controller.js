const asyncWrapper = require("../error/wrapper");
const assignmentService = require("../services/assignment.service");

// Create Assignment
const create = asyncWrapper(async (req, res, next) => {
    const { isVerified, isVerifiedMessage } = assignmentService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new assignment
    if (isVerified) {
        const { success, data, message } = await assignmentService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});
// Create Assignment

// Update Assignment
const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = await assignmentService.verifyUpdateRequest(req.body, id); // Will verify the request and return data if the request is valid to upadate a assignment
    if (isVerified) {
        const { success, data, message } = await assignmentService.update(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});
// Update Assignment

// Get Assignment
const getAssignment = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await assignmentService.getAssignment(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the assignment. Sorry!');
    }
});
// Get Assignment


module.exports = { create, update, getAssignment }