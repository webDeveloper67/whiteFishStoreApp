const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  prodImg: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0,
    required: [true, 'Quantity is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: [{ type: mongoose.Schema.ObjectId, ref: 'Shop' }],
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
