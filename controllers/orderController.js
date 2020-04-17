const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const { Order } = require('./../models/Order');
const { CartItem } = require('./../models/Order');

// Create Order
exports.createOrder = asyncMiddleware(async (req, res, next) => {
  const order = new Order({
    user: req.user,
    deliveryAddress: req.body.deliveryAddress,
    products: req.body.products,
    customer_name: req.body.customer_name,
    customer_email: req.body.customer_email
  });

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

// List Order By User
exports.listOrderByUser = asyncMiddleware(async (req, res, next) => {
  const orders = await Order.find({ user: req.profile._id }).sort('-created');

  if (!orders || orders.length <= 0) {
    return next(new ErrorResponse('orders are not found!', 400));
  }

  res.json(orders);
});

// List Order By Shop
exports.listOrderByShop = asyncMiddleware((req, res, next) => {
  Order.find({ 'products.shop': req.shop._id })
    .populate({ path: 'products.product', select: '_id name price' })
    .sort('-created')
    .exec((err, orders) => {
      if (err || orders.length <= 0) {
        return next(new ErrorResponse(err, 400));
      }
      res.json(orders);
    });
});

// Read Order via OrderID
exports.readOrder = asyncMiddleware((req, res, next) => {
  return res.json(req.order);
});

exports.updateOrder = asyncMiddleware(async (req, res, next) => {
  const order = await Order.findOneAndUpdate(
    { 'products._id': req.body.cartItemId },
    {
      $set: {
        'products.$.status': req.body.status
      }
    },
    { new: true }
  );

  if (!order) {
    return next(new ErrorResponse('Order not found', 400));
  }

  res.json(order);
});

// Get Status Values in CartItem Schema
exports.getStatusValues = (req, res) => {
  res.json(CartItem.schema.path('status').enumValues);
};
