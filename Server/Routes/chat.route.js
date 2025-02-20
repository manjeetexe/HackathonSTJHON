const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const chatController = require('./../Controllers/chat.controller')


router.post('/chat',[
    body('message').notEmpty().withMessage('Invalid input '),
],
    chatController.chatWithAi
);





router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router