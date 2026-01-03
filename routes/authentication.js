// routes/authentication.js
const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

/**
 * @route POST /api/Authentication/Login
 * @description User login
 * @access Public
 */
router.post('/Login', authenticationController.login);

module.exports = router;
