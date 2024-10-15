const mongoose = require('mongoose');

const User = require('../models/user');
const Task = require('../models/task');

// expects userID in req (passed from middelware)
// responds with all tasks assigned to the user (populated with users' names)
const getAllTasks = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    // should be handled in middleware
    // if (!mongoose.Types.ObjectId.isValid(userID)) {
    //   return res.status(400).json({ message: 'Invalid format for user ID' });
    // }
    // if (!(await User.findById(userID))) {
    //   return res.status(404).json({ message: 'User not found' });
    // }


    const tasks = await Task.find({ assignedTo: userID })
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')

    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
      assignedTo: {
        id: task.assignedTo._id,
        name: task.assignedTo.name
      },
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

// expects userID in req (passed from middelware)
// expects task id passed as parameter :id
// responds with 1 task by id created by the user (populated with users' names)
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

    const task = await Task.findOne({ _id: id, assignedTo: userID })
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const formattedTask = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
      assignedTo: {
        id: task.assignedTo._id,
        name: task.assignedTo.name,
      },
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
// deletes 1 task by id assigned to the user
// responds with a success message
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

    if (!['in progress', 'completed'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findOne({ _id: id, assignedTo: userID })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = newStatus;
    await task.save();

    const updatedTask = await Task.findOne({ _id: id, assignedTo: userID })
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')

    const formattedTask = {
      id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      dueDate: updatedTask.dueDate,
      priority: updatedTask.priority,
      category: updatedTask.category,
      assignedTo: {
        id: updatedTask.assignedTo._id,
        name: updatedTask.assignedTo.name,
      },
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
  getTask,
  updateTaskStatus
}