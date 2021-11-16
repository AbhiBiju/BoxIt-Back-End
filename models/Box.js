const mongoose = require("mongoose");

const { Schema } = mongoose;

const boxSchema = new Schema({
  packingDate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: false,
    min: 0.99,
  },
  isMoving: {
    type: Boolean,
    required: true,
    default: true,
  },
  isFragile: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
