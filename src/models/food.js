const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  smallDescription: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
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