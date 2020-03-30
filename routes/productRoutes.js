const express = require('express');
const authController = require('./../controllers/authController');
const shopController = require('./../controllers/shopController');
const productController = require('./../controllers/productController');
const router = express.Router();

router.route('/').get(productController.getAllProducts);

router
  .route('/by/:shopId')
  .post(
    authController.protect,
    shopController.isOwner,
    productController.createProduct
  );

router.param('shopId', shopController.shopByID);
router.param('productId', productController.productByID);

module.exports = router;
