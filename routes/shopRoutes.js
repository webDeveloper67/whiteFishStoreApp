const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const shopController = require('./../controllers/shopController');
const router = express.Router();

router.route('/').get(shopController.getAllShops);
router.route('/defaultphoto').get(shopController.defaultPhoto);

router
  .route('/by/:userId')
  .post(
    authController.protect,
    authController.isAuthorization,
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
  )
  .delete(
    authController.protect,
    shopController.isOwner,
    shopController.deleteShop
  );

router
  .route('/logo/:shopId')
  .get(shopController.photo, shopController.defaultPhoto);

router.param('shopId', shopController.shopByID);
router.param('userId', userController.userByID);

module.exports = router;
