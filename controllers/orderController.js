const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const { Order } = require('./../models/Order');

// Create Order
exports.createOrder = asyncMiddleware((req, res, next) => {
  const obj = req.body;
  // const { deliveryAddress: { city, state, street, zipcode, country } } = obj;

  const newOrder = new Order({
    obj,

    deliveryAddress: req.body.deliveryAddress,
    user: req.user
  });

  // const newOrder = new Order({ obj });

  console.log(newOrder, '😀');
  newOrder.save((err, result) => {
    if (err) {
      return next(new ErrorResponse(err, 400));
    }
    res.status(200).json(result);
  });
});

// Order By ID
exports.orderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .populate('products.shop', 'name')
    .exec((err, order) => {
      if (err || !order) return next(new ErrorResponse(err, 400));
      req.order = order;
      next();
    });
};
