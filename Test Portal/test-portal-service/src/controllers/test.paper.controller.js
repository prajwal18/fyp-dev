const asyncWrapper = require("../error/wrapper");
const testPaperService = require("../services/test.paper.service");

const createTestPaper = asyncWrapper(async (req, res, next) => {
    const { isVerified, reqData, isVerifiedMessage } = testPaperService.verifyCreateRequest(req.body); // Will verify the request and returns data(request body) if the request is valid to create a new test.
    if(isVerified){
        const { success, data, message } = await testPaperService.create(reqData);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

const updateTestPaper = asyncWrapper(async (req, res, next) => {
    const { isVerified, reqData, isVerifiedMessage } = testPaperService.verifyUpdateRequest(req.body) // Will verify the request and return data if the request is valid to upadate a test.
    if(isVerified){
        const { success, data, message } = await testPaperService.update(reqData);
        if(success){
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error(isVerifiedMessage);
    }
});

module.exports = { createTestPaper, updateTestPaper };