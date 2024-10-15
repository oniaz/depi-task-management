const express = require('express');
const employeeController = require('../controllers/employee-controller');

const router = express.Router();

router.get('/tasks', employeeController.getAllTasks);
router.get('/tasks/:id', employeeController.getTask);
router.patch('/tasks/:id', employeeController.updateTaskStatus);

module.exports = router;
