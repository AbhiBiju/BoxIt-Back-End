const mongoose = require('mongoose');

const { Schema } = mongoose;

const boxSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  images: {
    type: String
  },
  price: {
    type: Number,
    required: false,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  },
});


const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
