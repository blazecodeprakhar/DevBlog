const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);
router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

module.exports = router;
