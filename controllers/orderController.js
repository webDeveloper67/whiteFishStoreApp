const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const { Order, CartItem } = require('./../models/Order');

// Create Order
exports.createOrder = asyncMiddleware(async (req, res, next) => {
  // const order = new Order({
  //   deliveryAddress: req.body.deliveryAddress,
  //   user: req.user,
  // });

  const order = new Order(req.body);
<<<<<<< HEAD
  // order.user = req.user;
  // order.user = req.user;
  // order.deliveryAddress = req.body.deliveryAddress;
  // order.products = req.body.products;

  console.log(order, '😀 order in orderController');
=======
  order.user = req.user;
  order.deliveryAddress = req.body.deliveryAddress;

  console.log(order, '😀');
>>>>>>> 7ac9b6fa3597cf0f242b8e23173850a7c344cc4d
  order.save((err, result) => {
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
