const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const employeeController = require('../controllers/employee-controller');

const router = express.Router();

router.use(authMiddleware.authenticate, authMiddleware.authorize(['employee', 'manager']));

router.get('/tasks', employeeController.getAllTasks);
router.get('/tasks/:id', employeeController.getTask);
router.patch('/tasks/:id', employeeController.updateTaskStatus);

module.exports = router;
