const asyncWrapper = require("../error/wrapper");
const testAnswerService = require("../services/test.answer.service");


const testAnswerExists = asyncWrapper(async (req, res, next) => {
    const { testId, studentId } = req.query;
    if (testId && studentId) {
        const { testExists, data, message } = await testAnswerService.checkTestAnswerExist(testId, studentId);
        res.json({ success: testExists, data: data, message: message });
    } else {
        throw new Error("Provide testId and studentId. Cannot find the test answer.");
    }
})

const createTestAnswer = asyncWrapper(async (req, res, next) => {
    const { isVerified, isVerifiedMessage } = await testAnswerService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new test.
    if (isVerified) {
        const { success, data, message } = await testAnswerService.create(req.body);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        console.log("\n\n\n", isVerified)
        throw new Error(isVerifiedMessage);

    }
});

const updateTestAnswer = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    const { isVerified, isVerifiedMessage } = await testAnswerService.verifyUpdateRequest(id); // Will verify the request and return data if the request is valid to upadate a test.
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
    const { isVerified, isVerifiedMessage } = await testAnswerService.verifyGradeRequest(req.body, id); // Will verify the request and return data if the request is valid to upadate a test.
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

const deleteTestAnswer = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await testAnswerService.deleteTestAnswer(id);
        if(success){
            res.json({ success, data, message })
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Please specify the test answer paper you want to delete.");
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



const getAllSpecificTests = asyncWrapper(async (req, res, next) => {
    const { courseIds, type, searchTerm, skip, take } = req.query;
    const courses = courseIds.split(',');
    const userId = res.locals.id;
    const role = res.locals;

    if (courses.length && type) {
        const { success, data, message, hits } = await testAnswerService.getAllSpecificTests(courses, type, searchTerm, skip, take, userId, role);
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



module.exports = {
    createTestAnswer, updateTestAnswer, gradeTestAnswer,
    getTest, testAnswerExists,
    getAllSpecificTests, deleteTestAnswer
};