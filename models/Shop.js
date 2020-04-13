const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const shopSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Shop Name is required']
  },
  shopImg: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Shop Description is required']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

shopSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
