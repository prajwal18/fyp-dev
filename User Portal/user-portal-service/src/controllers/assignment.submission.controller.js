const asyncWrapper = require("../error/wrapper");
const assignmentSubmissionService = require("../services/assignment.submission.service");

const create = asyncWrapper(async (req, res, next) => {
    const { isVerified, isVerifiedMessage } = assignmentSubmissionService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new assignment.
    if (isVerified) {
        const { success, data, message } = await assignmentSubmissionService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = assignmentSubmissionService.verifyUpdateRequest(id); // Will verify the request and return data if the request is valid to upadate a assignment.
    if (isVerified) {
        const { success, data, message } = await assignmentSubmissionService.update(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const grade = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = assignmentSubmissionService.verifyGradeRequest(id); // Will verify the request and return data if the request is valid to upadate a assignment.
    if (isVerified) {
        const { success, data, message } = await assignmentSubmissionService.grade(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }

})

const getSubmission = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await assignmentSubmissionService.getSubmission(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the assignment. Sorry!');
    }
});

const getAllSubmissions = asyncWrapper(async (req, res, next) => {
    const { courseIds, type } = req.query;
    const courses = courseIds.split(',');

    if (courses.length && type) {
        const { success, data, message, hits } = await assignmentSubmissionService.getAllSubmissions(courses, type);
        if (success) {
            res.json({ success, data, message, hits });
        } else {
            throw new Error(message);
        }
    } else if (type) {
        throw new Error('Sorry, cannot find any assignments.');
    } else {
        throw new Error('Specify the assignment type.');
    }

});


module.exports = { create, update, grade, getSubmission, getAllSubmissions };