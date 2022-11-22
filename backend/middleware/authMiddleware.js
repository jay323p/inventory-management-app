const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// applying this middleware protects the route through token authorization
// and provides that route access to req.user

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(req.cookies);

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, please login');
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, please login');
  }
});

module.exports = protect;
