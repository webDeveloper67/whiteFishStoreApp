const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const orderController = require('./../controllers/orderController');
const userController = require('./../controllers/userController');
const shopController = require('./../controllers/shopController');

const router = express.Router();

router.route('/:userId').post(
  authController.protect,
  // productController.decreaseQuantity,
  orderController.createOrder
);

router.param('userId', userController.userByID);
router.param('orderId', orderController.orderByID);
router.param('productId', productController.productByID);
module.exports = router;
