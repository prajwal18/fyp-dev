require('dotenv').config();
const { UserRole } = require("../constants/enum");
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const asyncWrapper = require("../error/wrapper");

const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.id = decoded.id;
    res.locals.email = decoded.email;
    res.locals.role = decoded.role;
    next()
  } catch (error) {
    throw new Error('Not authorized to view the page');
  }
});

// Authorize same user access.
// Any request that makes use of this middleware will need to proive the user's id in the request query
const authorizeSameUser = asyncWrapper(async (req, res, next) => {
  const id = req.query.id;
  const email = res.locals.email;
  if (id && email) {
    const user = await User.findById(id);
    const checkUser = await User.findOne({email: email});
    if (user && checkUser) {
      if(user.email === checkUser.email){
        next();
      } else {
        throw new Error("Sorry, you are not authroize to make this request. Different User");
      }
    } else {
      throw new Error("Sorry, cannot find user");
    }
  } else {
    throw new Error("You are not authorized to access this end point");
  }
});


// Authorize student
const authorizeStudent = asyncWrapper(async (req, res, next) => {
  const email = res.locals.email;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.role === UserRole[0]) {
        next();
      } else {
        throw new Error("You are not authorized to view this page. Not a Student.");
      }
    } else {
      throw new Error("User cannot be identified.");
    }
  } else {
    throw new Error("You're not authorized to view this page.");
  }
});


// Authorize teacher
const authorizeTeacher = asyncWrapper(async (req, res, next) => {
  const email = res.locals.email;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.role === UserRole[1]) {
        next();
      } else {
        throw new Error("You are not authorized to view this page. Not a Teacher.");
      }
    } else {
      throw new Error("User cannot be identified.");
    }
  } else {
    throw new Error("You're not authorized to view this page.");
  }
});


module.exports = { authenticationMiddleware, authorizeSameUser, authorizeStudent, authorizeTeacher };