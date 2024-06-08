const express = require('express');
const { register, verifyEmail, login, resetPassword ,requestPasswordReset} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;