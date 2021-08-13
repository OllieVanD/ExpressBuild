const express = require('express');
const router = express.Router()
const messageController = require('../controllers/message.js')

router.get('/:messengerId/:receiverId', messageController.loadMessage)
router.post('/:messengerId/:receiverId', messageController.sendMessage)


module.exports = router