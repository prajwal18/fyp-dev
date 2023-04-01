const asyncWrapper = require("../error/wrapper");
const assignmentSubmissionService = require("../services/assignment.submission.service");

const submissionExists = asyncWrapper(async (req, res, next) => {
    const { assignmentId, studentId } = req.query;
    if (assignmentId && studentId) {
        const { submissionExists, data, message } = await assignmentSubmissionService.checkSubmissionExist(assignmentId, studentId);
        res.json({ success: submissionExists, data: data, message: message });
    } else {
        throw new Error("Provide assignmentId and studentId. Cannot find the assignment submission.");
    }
});



const create = asyncWrapper(async (req, res, next) => {
    const { isVerified, isVerifiedMessage } = await assignmentSubmissionService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new assignment.
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
    const { isVerified, isVerifiedMessage } = await assignmentSubmissionService.verifyUpdateRequest(id); // Will verify the request and return data if the request is valid to upadate a assignment.
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
    const { isVerified, isVerifiedMessage } = await assignmentSubmissionService.verifyGradeRequest(req.body, id); // Will verify the request and return data if the request is valid to upadate a assignment.
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

const deleteSubmission = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await assignmentSubmissionService.deleteSubmission(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the assignment. Sorry!');
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


const getAllSpecificAssignments = asyncWrapper(async (req, res, next) => {
    const { courseIds, type, searchTerm, skip, take } = req.query;
    const courses = courseIds.split(',');
    const userId = res.locals.id;
    const role = res.locals;

    if (courses.length && type) {
        const { success, data, message, hits } = await assignmentSubmissionService.getAllSpecificAssignments(courses, type, searchTerm, skip, take, userId, role);
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


module.exports = { submissionExists, create, update, grade, getSubmission, getAllSpecificAssignments, deleteSubmission };