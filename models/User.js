const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false
  },
  seller: {
    type: Boolean,
    default: false
  },
  updated: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Encrypt Password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare passwords
userSchema.methods.comparePassword = async function(candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
