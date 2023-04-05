const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        require: [true, 'Specify the users involved in the conversation.']
    },
    conversation: {
        type: [{
            user: mongoose.Schema.Types.ObjectId,
            message: String
        }]
    }
});

//Below line will automatically generate createdAt & updatedAt
conversationSchema.set("timestamps", true);

module.exports = mongoose.model("Conversation", conversationSchema);