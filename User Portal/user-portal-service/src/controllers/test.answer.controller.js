const asyncWrapper = require("../error/wrapper");
const testAnswerService = require("../services/test.answer.service");

const createTestAnswer = asyncWrapper(async (req, res, next) => {
    const { isVerified, isVerifiedMessage } = testAnswerService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new test.
    if (isVerified) {
        const { success, data, message } = await testAnswerService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const updateTestAnswer = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = testAnswerService.verifyUpdateRequest(id); // Will verify the request and return data if the request is valid to upadate a test.
    if (isVerified) {
        const { success, data, message } = await testAnswerService.update(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const gradeTestAnswer = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = testAnswerService.verifyGradeRequest(id); // Will verify the request and return data if the request is valid to upadate a test.
    if (isVerified) {
        const { success, data, message } = await testAnswerService.grade(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }

})

const getTest = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await testAnswerService.getTest(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the test. Sorry!');
    }
});

const getAllTests = asyncWrapper(async (req, res, next) => {
    const { courseIds, type } = req.query;
    const courses = courseIds.split(',');

    if (courses.length && type) {
        const { success, data, message, hits } = await testAnswerService.getAllTests(courses, type);
        if (success) {
            res.json({ success, data, message, hits });
        } else {
            throw new Error(message);
        }
    } else if (type) {
        throw new Error('Sorry, cannot find any tests.');
    } else {
        throw new Error('Specify the test type.');
    }

});


module.exports = { createTestAnswer, updateTestAnswer, gradeTestAnswer, getTest, getAllTests };