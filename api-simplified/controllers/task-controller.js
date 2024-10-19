const mongoose = require('mongoose');

const User = require('../models/user');
const Task = require('../models/task');

// expects userID in req (passed from middelware)
// responds with all tasks created by the user (populated with user's name)
const getAllTasks = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const tasks = await Task.find({ createdBy: userID })
      .populate('createdBy', 'name')

    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      category: task.category,
      createdBy: {
        id: task.createdBy._id,
        name: task.createdBy.name
      },
    }));

    res.status(200).json({ message: "Tasks retrieved successfully", tasks: formattedTasks });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// expects createBy userID in req (passed from middelware)
// params: title (required), priority (optional, default: 'medium'), category (required)
// sets status to 'todo'
// responds with created task (populated with user's name)
const createTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { title, priority, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: 'Missing required fields: title or category' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const newTask = new Task({
      title,
      createdBy: userID,
      priority,
      category
    });

    await newTask.save();

    const updatedTask = await Task.findById(newTask._id)
      .populate('createdBy', 'name')

    const formattedTask = {
      id: updatedTask._id,
      title: updatedTask.title,
      status: updatedTask.status,
      priority: updatedTask.priority,
      category: updatedTask.category,
      createdBy: {
        id: updatedTask.createdBy._id,
        name: updatedTask.createdBy.name,
      },
    };

    res.status(201).json({ message: "Task created successfully", task: formattedTask });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// expects userID in req (passed from middelware)
// expects task id passed as parameter :id
// responds with 1 task by id created by the user (populated with user's name)
const getTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid format for task ID' });
    }

    const task = await Task.findOne({ _id: id, createdBy: userID })
      .populate('createdBy', 'name')

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const formattedTask = {
      id: task._id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      category: task.category,
      createdBy: {
        id: task.createdBy._id,
        name: task.createdBy.name,
      },
    };

    res.status(200).json({ message: 'Task retrieved successfully', task: formattedTask });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// expects userID in req (passed from middelware)
// expects task id passed as parameter :id
// deletes 1 task by id created by the user
// responds with a success message
const deleteTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid format for task ID' });
    }

    const task = await Task.findOne({ _id: id, createdBy: userID })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// expects userID in req (passed from middelware)
// expects task id passed as parameter :id
// parameters to be updated: title, status, priority, category
// responds with updated task (populated with user's name)
const updateTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { id } = req.params;
    const { title,
      status,
      priority,
      category } = req.body;

    const task = await Task.findOne({ _id: id, createdBy: userID })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (status && !['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const updates = {
      title,
      status,
      priority,
      category,
    };

    Object.keys(updates).forEach(field => {
      if (updates[field]) {
        task[field] = updates[field];
      }
    });

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate('createdBy', 'name')

    const formattedTask = {
      id: updatedTask._id,
      title: updatedTask.title,
      status: updatedTask.status,
      priority: updatedTask.priority,
      category: updatedTask.category,
      createdBy: {
        id: updatedTask.createdBy._id,
        name: updatedTask.createdBy.name,
      },
    };

    res.status(200).json({ message: 'Task updated successfully', task: formattedTask });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// expects userID in req (passed from middelware)
// expects task id passed as parameter :id
// expects newStatus to be passed in body with values "todo", "in-progress", or "done"
// responds with updated task (populated with user's name)
const updateTaskStatus = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { id } = req.params;
    const { newStatus } = req.body;

    if (!newStatus) {
      return res.status(400).json({ message: 'Missing required fields: newStatus' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid format for task ID' });
    }

    if (!['todo', 'in-progress', 'done'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findOne({ _id: id, createdBy: userID })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = newStatus;
    await task.save();

    const updatedTask = await Task.findById(id)
      .populate('createdBy', 'name')

    const formattedTask = {
      id: updatedTask._id,
      title: updatedTask.title,
      status: updatedTask.status,
      priority: updatedTask.priority,
      category: updatedTask.category,
      createdBy: {
        id: updatedTask.createdBy._id,
        name: updatedTask.createdBy.name,
      },
    };

    res.status(200).json({ message: 'Task status updated successfully', task: formattedTask });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  updateTaskStatus
}
