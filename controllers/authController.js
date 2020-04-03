const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.signpUser = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  sendTokenResponse(user, 200, res);
});

// Login User
exports.loginUser = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // check for the user
  const user = await User.findOne({ email }).select('+password');

  if (!user || !await user.comparePassword(password, user.password)) {
    return next(new ErrorResponse('Incorrect Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// Create token
const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// create cookie
const sendTokenResponse = async (user, httpCode, res) => {
  const token = createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
    // httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.status(httpCode).cookie('jwt', token, cookieOptions).json({
    token
  });
};

// Protect Auth Middleware
exports.protect = asyncMiddleware(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorized!!', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized User!!', 401));
  }
});

exports.isAuthorization = (req, res, next) => {
  const authorized =
    req.profile &&
    req.user &&
    req.profile._id.toString() === req.user._id.toString();

  if (!authorized) {
    return next(new ErrorResponse('User is not authorized', 403));
  }
  next();
};
