const express = require('express');
const router = express.Router();
// Authentication middleware
const { authenticationMiddleware } = require("../middleware/auth");
const conversationController = require("../controllers/conversation.controller");

// Check if conversation exists
router.get('/check', authenticationMiddleware, conversationController.conversationExists)
// Check if  conversation exists

// Create conversation 
router.post('/create', authenticationMiddleware, conversationController.createConversation);
// Create conversation 

// Update conversation
// To update the conversation, you need to provied it's id like so
// .../update?id=<--- conversation's id --->
router.put('/update', authenticationMiddleware, conversationController.updateConversation);
// Update conversation


// Get conversation
router.get('/get-conversation', authenticationMiddleware, conversationController.getConversation);


module.exports = router;