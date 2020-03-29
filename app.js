const express = require('express');
const app = express();
const morgan = require('morgan');
const shopRoutes = require('./routes/shopRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Mounting routes
app.use('/api/v1/shops', shopRoutes);

module.exports = app;
