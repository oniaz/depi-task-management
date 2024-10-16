const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/',authMiddleware.authenticate ,userController.deleteUser);

module.exports = router;
