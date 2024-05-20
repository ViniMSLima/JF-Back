const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  smallDescription: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imagesList: {
    type: [String],
    required: true,
  }
});

const Food = mongoose.model("Food", FoodSchema);
exports.Food = Food;
exports.FoodSchema = FoodSchema;