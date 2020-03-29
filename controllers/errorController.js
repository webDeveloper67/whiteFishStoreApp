const ErrorResponse = require('./../helpers/ErrorResponse');

const dupliErrorHandler = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}`;
  return new ErrorResponse(message, 400);
};

const validatorErrorHandler = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorResponse(message, 400);
};

// Development Errors
const devErrors = (err, res) => {
  res.status(err.httpCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  });
};

// Operational Errors
const opeErrors = (err, res) => {
  if (err.isOperational) {
    res.status(err.httpCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR 😈', err);
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong!'
    });
  }
};

// Error Handler
module.exports = (err, req, res, next) => {
  err.httpCode = err.httpCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrors(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let operationalError = { ...err };

    if (operationalError.code === 11000) {
      operationalError = dupliErrorHandler(operationalError);
    }

    // validatorError - duplication
    if (operationalError.name === 'ValidationError') {
      operationalError = validatorErrorHandler(operationalError);
    }
    opeErrors(operationalError, res);
  }
};
