const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const User = require('../models/user');
const Task = require('../models/task');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields: name, email, or password' });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hashedPassword, role: 'employee' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// returns token  + users's name
// token doesn't expire
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields: email or password' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const jwtToken = jwt.sign({ userID: existingUser._id }, process.env.JWT_SECRET);
      // const token = jwt.sign({ userID: existingUser._id }, process.env.JWT_SECRET,  { expiresIn: '7d' });

      return res.status(200).json({ message: 'Login successful', jwtToken, user: existingUser.name, roleOnLogin: existingUser.role });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// deletes a user
// deletes all tasks created by the user
// responds with a success message
const deleteUser = async (req, res) => {
  try {
    const { userID } = req.user;

    if (!userID) {
      return res.status(400).json({ message: 'Missing required fields: UserID from token' });
    }

    await Task.deleteMany({ createdBy: userID });

    await User.findByIdAndDelete(userID);
    res.status(200).json({ message: 'User and associated tasks deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  deleteUser
};
