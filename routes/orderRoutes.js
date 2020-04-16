const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const orderController = require('./../controllers/orderController');
const userController = require('./../controllers/userController');
const shopController = require('./../controllers/shopController');

const router = express.Router();

router.route('/status_values').get(orderController.getStatusValues);

router
  .route('/:userId')
  .post(
    authController.protect,
    productController.decreaseQuantity,
    orderController.createOrder
  );

router
  .route('/user/:userId')
  .get(authController.protect, orderController.listOrderByUser);

router
  .route('/shop/:shopId')
  .get(
    authController.protect,
    shopController.isOwner,
    orderController.listOrderByShop
  );

router.route('/:orderId').get(orderController.readOrder);

router
  .route('/:shopId/cancel/:productId')
  .put(
    authController.protect,
    shopController.isOwner,
    productController.increaseQuantity,
    orderController.updateOrder
  );

router.param('userId', userController.userByID);
router.param('shopId', shopController.shopByID);
router.param('productId', productController.productByID);
router.param('orderId', orderController.orderByID);
module.exports = router;
