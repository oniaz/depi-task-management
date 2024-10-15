
const mongoose = require('mongoose');

const User = require('../models/user');
const Task = require('../models/task');

// retrieves all users, with all their data (id, email, name, role, excluding the password)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $nin: ['admin', 'deleted'] } }).select('-password');

    // for deleted-user if implemented in the future
    // const users = await User.find({ role: { $nin: ['admin', 'deleted'] } }).select('-password');

    const formattedUsers = users.map(user => ({
      id: user._id, // or keep it as _id  or id ?
      name: user.name,
      email: user.email,
      role: user.role
    }));

    res.status(200).json(formattedUsers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updates the role of a user
// expects the user ID in the request params
// expects the new role in the request body
// returns a success message and the updated user data (id, email, name, role)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    ////////////////// TEST THIS !!!!!!!!!!!!!!!!!!
    if (!id || !newRole) {
      return res.status(400).json({ message: 'Missing required fields: newRole' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid format for user ID ' });
    }

    if (!['employee', 'manager'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (['admin', 'deleted'].includes(user.role)) {
      return res.status(400).json({ message: `Cannot change ${user.role} role` });
    }

    user.role = newRole;

    await user.save();
    res.status(200).json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// deletes a user
// sets the assignedTo field of all tasks assigned to the user to null
// if user is a manager, deletes all tasks assigned to the user
// expects the user ID in the request params
// returns a success message
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing required fields: id (of the user to be deleted)' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid format for user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (['admin', 'deleted'].includes(user.role)) {
      return res.status(400).json({ message: `Cannot delete user with ${user.role} role` });
    }

    /////////////// null or make a special deleted user?
    // const placeholderDeletedUserEmail = process.env.PLACEHOLDER_DELETED_USER_EMAIL; ???

    // const placeholderDeletedUserEmail = process.env.PLACEHOLDER_DELETED_USER_EMAIL;
    // let placeholderDeletedUser = await User.findOne({ email: placeholderDeletedUserEmail });
    // if (!placeholderDeletedUser) {
    //   placeholderDeletedUser = new User({ name: 'Deleted User', email: placeholderDeletedUserEmail, role: 'deleted' });
    //   await placeholderDeletedUser.save();
    // }
    // await Task.updateMany({ assignedTo: id }, { assignedTo: placeholderDeletedUser._id });

    // nvm then, they agreed to delete all
    await Task.deleteMany({ assignedTo: id });

    if (user.role === 'manager') {
      await Task.deleteMany({ createdBy: id });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User and associated tasks deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser
};
