const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const shopController = require('./../controllers/shopController');
const router = express.Router();

router.route('/').get(shopController.getAllShops);

router
  .route('/by/:userId')
  .post(
    authController.protect,
    userController.isSeller,
    shopController.createShop
  )
  .get(authController.protect, shopController.listShopByOwner);

router
  .route('/:shopId')
  .get(shopController.readShop)
  .put(
    authController.protect,
    shopController.isOwner,
    shopController.updateShop
  );

router.param('shopId', shopController.shopByID);
router.param('userId', userController.userByID);

module.exports = router;
