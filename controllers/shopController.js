const fs = require('fs');
const formidable = require('formidable');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const Shop = require('./../models/Shop');

// CREATE a SHOP
exports.createShop = asyncMiddleware((req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new ErrorResponse('Image could not be uploaded.', 401));
    }

    let newShop = new Shop(fields);

    newShop.owner = req.user;

    if (files.shopImg) {
      newShop.shopImg.data = fs.readFileSync(files.shopImg.path);
      newShop.shopImg.contentType = files.shopImg.type;
    }

    const shop = await newShop.save();

    return res.status(200).json(shop);
  });
});

// Shop By ID
exports.shopByID = (req, res, next, id) => {
  Shop.findById(id).populate('owner', '_id name').exec((err, shop) => {
    if (err || !shop) return next(new ErrorResponse('Shop not found', 400));
    req.shop = shop;
    next();
  });
};

// Get all shops
exports.getAllShops = asyncMiddleware(async (req, res, next) => {
  const shops = await Shop.find();

  res.status(200).json(shops);
});
