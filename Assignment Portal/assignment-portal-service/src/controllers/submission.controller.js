const asyncWrapper = require("../error/wrapper");
const submissionService = require("../services/submission.service");

// Submit Submission
const submit = asyncWrapper(async(req, res, next) => {
    const isReqValid = submissionService.validateRequest(req.body);
    if(isReqValid){
        const { success, data, message } = await submissionService.submitAssignment(req.body);  
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Bad Request, Provide all the necessary parameters.");
    }
});
// Submit Submission

// Greade Submission
const grade = asyncWrapper(async(req, res, next) => {
    const id = req.query.id; // To identify the submission to be graded
    if(id){
        const { success, data, message } = await submissionService.gradeSubmission(id, req.body);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find submission. Id query is missing.");
    }
});
// Greade Submission

// Get Submission
const getSubmission = asyncWrapper(async(req, res, next) => {
    const id = req.query.id; // To identify the submission to be fetched
    if(id){
        const { success, data, message } = await submissionService.getSubmission(id);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Cannot find submission. Id query is missing.");
    }
});
// Get Submission

// Get all submissions
const getAllSubmissions = asyncWrapper(async(req, res, next) => {
    const { studentId, assinmentId } = req.query.id;
    if(studentId || assinmentId){
        const { success, data, message } = await submissionService.getAllSubmissions(studentId, assinmentId);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Student id and assignment id are both missing, cannot identify submission.");
    }
});
// Get all submissions

module.exports = { submit, grade, getSubmission, getAllSubmissions };