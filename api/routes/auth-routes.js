const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/role', authMiddleware.authenticate, authController.getCurrentRole);

module.exports = router;
