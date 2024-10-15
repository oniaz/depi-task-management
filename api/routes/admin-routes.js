const express = require("express")
const authController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/users', authController.getAllUsers);
router.patch('/users/:id', authController.updateUserRole);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
