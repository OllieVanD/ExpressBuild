const express = require('express');
const router = express.Router()
const loginController = require('../controllers/index.js')

router.get('/', loginController.loadPage);

module.exports = router