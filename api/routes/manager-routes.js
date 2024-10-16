const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const managerController = require('../controllers/manager-controller');

const router = express.Router();

router.use(authMiddleware.authenticate, authMiddleware.authorize(['manager']));

router.get('/users', managerController.getAllUsers);
router.get('/tasks', managerController.getAllTasks);
router.post('/tasks', managerController.createTask);
router.get('/tasks/:id', managerController.getTask);
router.delete('/tasks/:id', managerController.deleteTask);
router.put('/tasks/:id', managerController.updateTask);

module.exports = router;
