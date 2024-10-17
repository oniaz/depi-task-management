const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const saltRounds = 10;

// Function to create admin user if it doesn't exist
const createAdmin = async () => {
  try {
    const bcrypt = require('bcrypt');
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

      const adminUser = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();

      console.log("Admin created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = createAdmin;
