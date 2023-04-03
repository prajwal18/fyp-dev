const Conversation = require("../models/conversation.model");

const checkConversationExists = async (users) => {
    const conversation = await Conversation.findOne({
        users: { '$all': users }
    });
    if (conversation) {
        return {
            exists: true,
            data: conversation._id,
            message: "Conversation between the users exists already."
        }
    } else {
        return {
            exists: false,
            data: null,
            message: "Conversation between the users does not exist"
        }
    }
}

const create = async (users) => {
    const conversation = await Conversation.create({
        users: users
    });
    if (conversation) {
        return {
            success: true, data: conversation, message: "Conversation between the users has been established."
        }
    } else {
        return {
            success: false, data: null, message: "Cannot establish conversation, Sorry"
        }
    }
}

const update = async (data, id) => {
    const conversation = await Conversation.findByIdAndUpdate(id, {
        '$addToSet': {
            conversation: [data]
        }
    });

    if (conversation) {
        return {
            success: true, data: conversation, message: "Conversation updated successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Conversation failed to update."
        }
    }
}

const getConversation = async (id) => {
    const conversation = await Conversation.findById(id);
    if (conversation) {
        return {
            success: true, data: conversation, message: "Conversation fetched successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Failed to retrive conversation."
        }
    }
}

module.exports = { checkConversationExists, create, update, getConversation }