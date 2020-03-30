const fs = require('fs');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const formidable = require('formidable');
const Product = require('./../models/Product');

// CREATE a product
exports.createProduct = asyncMiddleware((req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse('Image could not be uploaded.', 401));
    }
    let newProduct = new Product(fields);

    newProduct.shop = req.shop;
    newProduct.owner = req.user;

    if (files.prodImg) {
      newProduct.prodImg.data = fs.readFileSync(files.prodImg.path);
      newProduct.prodImg.contentType = files.prodImg.type;
    }

    const product = await newProduct.save();

    return res.status(200).json(product);
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
