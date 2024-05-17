const mongoose = require("mongoose");

const ComboSchema = new mongoose.Schema({
    productsIds: {
        type: [String],
        required: true
    },
    imagesList: {
        type: [String],
        required: true,
    },
    product: {
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
    }
});

const Combo = mongoose.model("Combo", ComboSchema);
exports.Combo = Combo;
exports.ComboSchema = ComboSchema;
