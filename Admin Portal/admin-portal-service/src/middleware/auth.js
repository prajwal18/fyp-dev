require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.model");
const asyncWrapper = require("../error/wrapper");

const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.email = decoded.email;
    next()
  } catch (error) {
    throw new Error('Not authorized to view the page');
  }
});

// Authorize admin access
const  authorizeAdmin = asyncWrapper(async (req, res, next) => {
  const email = res.locals.email;
  if(email){
    const admin = await Admin.findOne({email: email});
    if(admin){
      next();
    } else {
      throw new Error('You\'re not authorized to view this page.');
    }
  } else {
    throw new Error('You\'re not authorized to view this page.');
  }
});

module.exports = { authenticationMiddleware, authorizeAdmin };