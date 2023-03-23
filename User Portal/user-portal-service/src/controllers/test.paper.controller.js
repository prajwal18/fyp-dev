const asyncWrapper = require("../error/wrapper");
const testPaperService = require("../services/test.paper.service");

const createTestPaper = asyncWrapper(async (req, res, next) => {
    const { isVerified, reqData, isVerifiedMessage } = testPaperService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new test.
    if (isVerified) {
        const { success, data, message } = await testPaperService.create(reqData);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const updateTestPaper = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, reqData, isVerifiedMessage } = testPaperService.verifyUpdateRequest(req.body, id); // Will verify the request and return data if the request is valid to upadate a test.
    if (isVerified) {
        const { success, data, message } = await testPaperService.update(reqData, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const getTest = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await testPaperService.getTest(id);
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
    const { courseIds } = req.query;
    const courses = courseIds.split(',');
    if (courses.length) {
        const { success, data, message, hits } = await testPaperService.getAllTests(courses);
        if (success) {
            res.json({ success, data, message, hits });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Sorry, cannot find any tests.');
    }
});

const getAllReleasedTests = asyncWrapper(async (req, res, next) => {
    const { courseIds } = req.query;
    const courses = courseIds.split(',');
    if (courses.length) {
        const { success, data, message, hits } = await testPaperService.getAllReleasedTests(courses);
        if (success) {
            res.json({ success, data, message, hits });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Sorry, cannot find any tests.');
    }
});

module.exports = { createTestPaper, updateTestPaper, getTest, getAllTests, getAllReleasedTests };