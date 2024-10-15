const express = require("express")
const authMiddleware = require('../middleware/auth-middleware');
const authController = require('../controllers/admin-controller');

const router = express.Router();

router.use(authMiddleware.authenticate, authMiddleware.authorize(['admin']));

router.get('/users', authController.getAllUsers);
router.patch('/users/:id', authController.updateUserRole);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
