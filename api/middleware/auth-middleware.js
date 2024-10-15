const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const user = require('../models/user');

// Middleware to protect routes

// to check if the user is authenticated
// extracts the token from the request headers
// verifies the token and passes the decoded user information to the request object
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(decoded.userID)) {
      return res.status(400).json({ message: 'Invalid format for user ID' });
    }

    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = { ...decoded, role: user.role };  // Add the decoded user information to the request object
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to check if the user is an admin
// const admin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({ message: 'Not authorized as admin' });
//     }
// };

// to check if the user has the required role 
const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      if (req.user && roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(403).json({ message: `Not authorized as ${roles.join(' or ')}` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { authenticate, authorize };
