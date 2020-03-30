const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const User = require('./../models/User');

// User By Id
exports.userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) return next(new ErrorResponse('User not found', 400));

    req.profile = user;
    next();
  });
};

// isSeller asyncMiddleware
exports.isSeller = (req, res, next) => {
  const isSeller = req.profile && req.profile.seller;
  if (!isSeller) {
    return next(new ErrorResponse('User is not a seller', 403));
  }
  next();
};

// Get All Users
exports.getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find().select('name email updated created');

  if (!users) {
    return next(new ErrorResponse('Users not found!', 400));
  }

  res.json(users);
});
