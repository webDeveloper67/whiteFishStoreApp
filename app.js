const express = require('express');
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorController = require('./controllers/errorController');
const ErrorResponse = require('./helpers/ErrorResponse');

// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS-enabled
app.use(cors());

// show logs to the console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Mounting routes
app.use('/api/v1/shops', shopRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);

// Unhandled routes
app.all('*', async (req, res, next) => {
  next(
    new ErrorResponse(`Can not find ${req.originalUrl} on the server!`, 404)
  );
});

// Error Controller Mounting
app.use(errorController);

module.exports = app;
