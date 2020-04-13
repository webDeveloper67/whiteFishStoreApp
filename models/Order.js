const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  quantity: Number,
  shop: [{ type: mongoose.Schema.ObjectId, ref: 'Shop' }],
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.Mixed, ref: 'CartItem' }],
  customer_name: {
    type: String,
    trim: true
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+.+\..+/, 'Please fill a valid email address']
  },
  deliveryAddress: {
    street: { type: String, required: 'Street is required' },
    city: { type: String, required: 'City is required' },
    state: { type: String, required: 'State is required' },
    zipcode: { type: String, required: 'Zip Code is required' },
    country: { type: String, required: 'Country is required' }
  },
  payment_id: {},
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  Order,
  CartItem
};
