const _ = require('lodash');
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

// Get userId from authController.protect
exports.getMe = (req, res, next) => {
  req.profile = req.user;

  next();
};

// GET Auth User
exports.getUser = asyncMiddleware((req, res, next) => {
  return res.json(req.profile);
});

// Filter Obj for Updating User
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Update User
exports.updateMe = asyncMiddleware(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ErrorResponse(
        'This route is not for Update Password, Please use /updatePassword',
        400
      )
    );
  }

  let user = req.profile;

  const filteredBody = filterObj(req.body, 'name', 'email', 'seller');
  user = _.extend(user, filteredBody);
  user.updated = Date.now();

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

// Get single User
exports.getUser = asyncMiddleware(async (req, res, next) => {
  return res.json(req.profile);
});

// Delete or deActivate user
exports.deleteMe = asyncMiddleware(async (req, res, next) => {
  await User.deleteOne({ _id: req.profile._id }, (err, result) => {
    if (err) {
      return next(new ErrorResponse(err, 400));
    }
    res.status(204).json({
      status: 'success',
      result
    });
  });
});
