const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  rating: {
    rate: {
      required: true,
      type: Number,
    },
    count: {
      required: true,
      type: Number,
    },
  },
  userId: {
    required: true,
    type: String,
  },
});

const carts = mongoose.model("carts", cartSchema);

module.exports = carts;
