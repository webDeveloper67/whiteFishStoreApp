const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const { Order, CartItem } = require('./../models/Order');

// Create Order
exports.createOrder = asyncMiddleware(async (req, res, next) => {
  const newOrder = new Order({
    user: req.user,
    order: req.body,
    deliveryAddress: req.body.deliveryAddress,
    products: req.body.products
  });
  console.log(req.body, 'req.body in createOrder');

  // const order = new Order(req.body);
  // order.user = req.user;
  // order.user = req.user;
  // order.deliveryAddress = req.body.deliveryAddress;
  // order.products = req.body.products;

  // const newOrder = new Order({
  //   deliveryAddress: req.body.order.deliveryAddress
  // });
  // newOrder.user = req.user;
  // const order = await newOrder.save();

  console.log(newOrder, '😀 newOrder in orderController');

  // send as response
  // res.json(order);

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
