const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const formidable = require('formidable');
const Product = require('./../models/Product');
const shopImage = './public/img/no-image-icon.png';
const resolvedImg = path.resolve(shopImage);

// CREATE a product
exports.createProduct = asyncMiddleware((req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse('Image could not be uploaded.', 401));
    }
    let product = new Product(fields);

    product.shop = req.shop;
    product.owner = req.user;

    if (files.prodImg) {
      product.prodImg.data = fs.readFileSync(files.prodImg.path);
      product.prodImg.contentType = files.prodImg.type;
    }

    product.save((err, result) => {
      if (err) {
        return next(new ErrorResponse(err, 400));
      }
      res.status(200).json(result);
    });
  });
});

// Get product vis its id
exports.productByID = (req, res, next, id) => {
  Product.findById(id).populate('shop', '_id name').exec((err, product) => {
    if (err || !product)
      return next(new ErrorResponse('Product not found', 400));

    req.product = product;

    next();
  });
};

// Get Single Product
exports.getProduct = asyncMiddleware(async (req, res, next) => {
  req.product.prodImg = undefined;
  return res.json(req.product);
});

// Get the image of a product with defined image
exports.photo = (req, res, next) => {
  if (req.product.prodImg.data) {
    res.set('Content-Type', req.product.prodImg.contentType);
    return res.send(req.product.prodImg.data);
  }
  next();
};

// default PHOTO for products without defined Image
exports.defaultPhoto = (req, res) => {
  return res.sendFile(resolvedImg);
};

// Update a product
exports.updateProduct = asyncMiddleware(async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new ErrorResponse('Photo could not be uploaded', 400));
    }

    let updatingProd = req.product;
    updatingProd = _.extend(updatingProd, fields);
    updatingProd.updated = Date.now();

    if (files.prodImg) {
      updatingProd.prodImg.data = fs.readFileSync(files.prodImg.path);
      updatingProd.prodImg.contentType = files.prodImg.type;
    }

    const updatedProduct = await updatingProd.save();

    return res.status(200).json(updatedProduct);
  });
});

// List products via shopId
exports.listProductByShop = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find({ shop: req.shop._id })
    .populate('shop', '_id name')
    .select('-image');

  if (!products || products.length <= 0) {
    return next(new ErrorResponse('Products not found!!!!', 400));
  }

  res.json(products);
});

// List Latest Products
exports.listLatestProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find({})
    .sort('-created')
    .limit(5)
    .populate('shop', '_id name');

  if (!products || products.length <= 0) {
    return next(new ErrorResponse('Latest products are not available!', 400));
  }

  res.json(products);
});

// List related Products
exports.listRelatedProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find({
    _id: { $ne: req.product },
    category: req.product.category
  })
    .limit(5)
    .populate('shop', '_id name');

  if (!products || products.length <= 0) {
    return next(new ErrorResponse('Related Products can not be found!', 400));
  }

  res.json(products);
});

// List categories
exports.listProductCategories = asyncMiddleware(async (req, res, next) => {
  const products = await Product.distinct('category', {});

  if (!products || products.length <= 0) {
    return next(new ErrorResponse('categories can not be found!', 400));
  }

  res.json(products);
});

// Delete a Product
exports.deleteProduct = asyncMiddleware(async (req, res, next) => {
  let product = req.product;

  product.remove((err, deletedProduct) => {
    if (err) {
      return next(new ErrorResponse('Product not found to delete', 400));
    }
    res.json(deletedProduct);
  });
});

// Get all Products
exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  const query = {};

  if (req.query.search)
    query.name = { $regex: req.query.search, $options: 'i' };
  if (req.query.category && req.query.category != 'All')
    query.category = req.query.category;

  const products = await Product.find(query)
    .populate('shop', '_id name')
    .select('-image');

  if (!products || products.length <= 0) {
    return next(new ErrorResponse('products can not be found.', 400));
  }
  res.json(products);
});

// Decrease the number of Quantity Middleware
exports.decreaseQuantity = asyncMiddleware((req, res, next) => {
  let bulkOps = req.body.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  const products = Product.bulkWrite(bulkOps);

  if (!products) {
    return next(new ErrorResponse('the Quantity can not be reduced!', 400));
  }

  next();
});

// Increase the number of quantity Middleware
exports.increaseQuantity = asyncMiddleware((req, res, next) => {
  Product.findByIdAndUpdate(
    req.product._id,
    { $inc: { quantity: req.body.quantity } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return next(new ErrorResponse(err, 400));
    }
    next();
  });
});
