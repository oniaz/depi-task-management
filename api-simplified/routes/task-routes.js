const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const taskController = require('../controllers/task-controller');

const router = express.Router();

router.use(authMiddleware.authenticate);

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id', taskController.updateTaskStatus);

module.exports = router;
