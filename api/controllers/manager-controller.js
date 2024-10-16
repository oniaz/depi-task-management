const mongoose = require('mongoose');

const User = require('../models/user');
const Task = require('../models/task');

// expects userID in req (passed from middelware)
// responds with all tasks created by the user (populated with users' names)
const getAllTasks = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const tasks = await Task.find({ createdBy: userID })
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

// expects createBy userID in req (passed from middelware)
// valid date formats:
// ISO 8601 Format:
// YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ
// 2024-10-15 2024-10-15T14:30:00Z 
// RFC 2822 Format: Tue, 15 Oct 2024 14:30:00 GMT
// Unix Timestamp: 1697371800000
// params: title (required), description (required), assignedTo (required), dueDate (required), priority (optional, default: 'medium'), category (required)
// sets status to  'in progress'
// responds with created task (populated with users' names)
const createTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { title, description, assignedTo, dueDate, priority, category } = req.body;

    if (!title || !description || !assignedTo || !dueDate || !category) {
      return res.status(400).json({ message: 'Missing required fields: title, description, assignedTo, dueDate, or category' });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: 'Invalid format for assignedTo ID' });
    }

    if (!(await User.findById(assignedTo))) {
      return res.status(404).json({ message: 'User assignedTo not found' });
    }

    if (isNaN(new Date(dueDate))) {
      return res.status(400).json({ message: 'Invalid due date' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy: userID,
      // // status: status || 'in progress',
      // status,
      dueDate: new Date(dueDate),
      // priority: priority || 'medium',
      priority,
      category
    });

    await newTask.save();
    // nice try but i need to populate :/
    // const {__v, _id, ...task} = newTask._doc;
    // res.status(201).json({ message: "Task created successfully", task: {id: _id, ...task} });

    const updatedTask = await Task.findById(newTask._id)
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');

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

    res.status(201).json({ message: "Task created successfully", task: formattedTask });

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

    const task = await Task.findOne({ _id: id, createdBy: userID })
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
// parameters to be updated: title, description, assignedTo, status, dueDate, priority, category
// responds with updated task (populated with users' names)
const updateTask = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    const { id } = req.params;
    const { title, description, assignedTo, status, dueDate, priority, category } = req.body;

    const task = await Task.findOne({ _id: id, createdBy: userID })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (dueDate && isNaN(new Date(dueDate))) {
      return res.status(400).json({ message: 'Invalid due date' });
    }

    if (status && !['in progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const updates = {
      title,
      description,
      assignedTo,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
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
      .populate('assignedTo', 'name');

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

    res.status(200).json({ message: 'Task updated successfully', task: formattedTask });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// retrieves all users (data : id, name)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $nin: ['admin', 'deleted'] } });

    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
    }));

    res.status(200).json({ message: "Users retrieved successfully", formattedUsers });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getAllUsers
}
