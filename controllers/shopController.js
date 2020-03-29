const asyncMiddleware = require('./../helpers/asyncMiddleware');
const Shop = require('./../models/Shop');

exports.getAllShops = asyncMiddleware(async (req, res, next) => {
  const shops = await Shop.find();

  res.status(200).json(shops);
});
