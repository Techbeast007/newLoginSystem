// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

router.get('/facebook', authController.facebookLogin);
router.get('/facebook/callback', authController.facebookCallback);

router.get('/logout', authController.logout);

module.exports = router;
