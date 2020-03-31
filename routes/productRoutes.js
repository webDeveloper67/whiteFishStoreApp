const express = require('express');
const authController = require('./../controllers/authController');
const shopController = require('./../controllers/shopController');
const productController = require('./../controllers/productController');
const router = express.Router();

router.route('/').get(productController.getAllProducts);
router.route('/latest').get(productController.listLatestProducts);
router.route('/categories').get(productController.listProductCategories);
router.route('/defaultphoto').get(productController.defaultPhoto);

router
  .route('/by/:shopId')
  .post(
    authController.protect,
    shopController.isOwner,
    productController.createProduct
  )
  .get(productController.listProductByShop);

router.route('/:productId').get(productController.getProduct);
router.route('/related/:productId').get(productController.listRelatedProducts);
router
  .route('/image/:productId')
  .get(productController.photo, productController.defaultPhoto);

router
  .route('/:shopId/:productId')
  .put(
    authController.protect,
    shopController.isOwner,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    shopController.isOwner,
    productController.deleteProduct
  );

router.param('shopId', shopController.shopByID);
router.param('productId', productController.productByID);

module.exports = router;
