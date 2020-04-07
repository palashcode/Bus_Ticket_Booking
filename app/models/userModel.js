const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: {type: String},
    phone: { type: String, unique: true }
  }
);

module.exports = mongoose.model('User', userModel);