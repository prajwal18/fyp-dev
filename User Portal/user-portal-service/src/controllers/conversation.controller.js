const asyncWrapper = require("../error/wrapper");
const conversationService = require("../services/conversation.service");

const conversationExists = asyncWrapper(async (req, res, next) => {
    const { userIds } = req.query;
    const users = userIds.split(',');
    if (users?.length === 2) {
        const { exists, data, message } = await conversationService.checkConversationExists(users);
        res.json({ success: exists, data: data, message: message });
    } else {
        throw new Error("Specify the users involved in the conversation.");
    }
})

const createConversation = asyncWrapper(async (req, res, next) => {
    const { userIds } = req.query;
    const users = userIds.split(',');
    if (users?.length === 2) {
        const { success, data, message } = await conversationService.create(users);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Specify the users involved in the conversation.');

    }
});

const updateConversation = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await conversationService.update(req.body, id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Specify the conversation. Missing id.');
    }
});

const getConversation = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
    if (id) {
        const { success, data, message } = await conversationService.getConversation(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Specify the conversation. Missing id.');
    }
});



module.exports = { conversationExists, createConversation, updateConversation, getConversation }