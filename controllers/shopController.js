const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const formidable = require('formidable');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const Shop = require('./../models/Shop');
const shopImage = './public/img/no-image-icon.png';
const resolvedImg = path.resolve(shopImage);

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

  if (!shops || shops.length <= 0) {
    next(new ErrorResponse('There is no shops:)', 400));
  }
  res.status(200).json(shops);
});

// READ A shop via its shopID
exports.readShop = asyncMiddleware((req, res, next) => {
  return res.json(req.shop);
});

// List Shops vis owner
exports.listShopByOwner = asyncMiddleware(async (req, res, next) => {
  const ownerShops = await Shop.find({ owner: req.profile._id }).populate(
    'owner',
    '_id name'
  );

  if (!ownerShops || ownerShops.length <= 0) {
    return next(new ErrorResponse('shops for this owner can not be found!'));
  }
  res.json(ownerShops);
});

// Update Shop
exports.updateShop = asyncMiddleware((req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new ErrorResponse('Photo can not be uploaded!', 400));
    }

    let updatingShop = req.shop;

    updatingShop = _.extend(updatingShop, fields);

    updatingShop.updated = Date.now();
    if (files.shopImg) {
      updatingShop.shopImg.data = fs.readFileSync(files.shopImg.path);
      updatingShop.shopImg.contentType = files.shopImg.type;
    }

    const updatedShop = await updatingShop.save();

    return res.status(200).json(updatedShop);
  });
});

// Delete a SHOP vis its id
exports.deleteShop = asyncMiddleware(async (req, res, next) => {
  let shop = req.shop;

  shop.remove((err, deletedShop) => {
    if (err || !shop) {
      return next(new ErrorResponse('shop can not be found!!', 400));
    }

    res.json(deletedShop);
  });
});

// PHOTo for shops
exports.photo = (req, res, next) => {
  if (req.shop.shopImg.data) {
    res.set('Content-Type', req.shop.shopImg.contentType);
    return res.send(req.shop.shopImg.data);
  }
  next();
};

// default PHOTO for shops without defined Image
exports.defaultPhoto = (req, res) => {
  return res.sendFile(resolvedImg);
};

// isOwner middleware for comparing req.shop.owner._id with req.user._id
exports.isOwner = (req, res, next) => {
  const isOwner =
    req.shop &&
    req.user &&
    req.shop.owner[0]._id.toString() === req.user._id.toString();

  if (!isOwner) {
    return next(
      new ErrorResponse('User is not authorized to do the action', 403)
    );
  }
  next();
};
