const express = require('express');
const shopController = require('./../controllers/shopController');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/').get(shopController.getAllShops);

router
  .route('/by/:userId')
  .post(
    authController.protect,
    userController.isSeller,
    shopController.createShop
  );

router.param('shopId', shopController.shopByID);
router.param('userId', userController.userByID);

module.exports = router;
