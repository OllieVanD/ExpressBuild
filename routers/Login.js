const express = require('express');
const router = express.Router()
const loginController = require('../controllers/login.js')

router.get('/', loginController.loadLogin)
router.post('/', loginController.login)
router.get('/new',loginController.loadRegister)
router.post('/new', loginController.register)

module.exports = router