class ErrorResponse extends Error {
  constructor(message, httpCode) {
    super(message);
    this.httpCode = httpCode;
    this.status = `${httpCode}`.startsWith('4')
      ? 'Failed-Response'
      : 'Error-Occured';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
