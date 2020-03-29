const express = require('express');
const app = express();
const morgan = require('morgan');
const shopRoutes = require('./routes/shopRoutes');
const errorController = require('./controllers/errorController');
const ErrorResponse = require('./helpers/ErrorResponse');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Mounting routes
app.use('/api/v1/shops', shopRoutes);

// Unhandled routes
app.all('*', async (req, res, next) => {
  next(
    new ErrorResponse(`Can not find ${req.originalUrl} on the server!`, 404)
  );
});

// Error Controller Mounting
app.use(errorController);

module.exports = app;
