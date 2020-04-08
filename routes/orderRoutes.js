const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const orderController = require('./../controllers/orderController');
const userController = require('./../controllers/userController');
const shopController = require('./../controllers/shopController');

const router = express.Router();

router
  .route('/:userId')
  .post(
    authController.protect,
    orderController.createOrder,
    productController.decreaseQuantity
  );

router.param('userId', userController.userByID);
router.param('orderId', orderController.orderByID);
module.exports = router;
