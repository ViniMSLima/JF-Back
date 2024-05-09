const mongoose = require("mongoose");
const { FoodSchema } = requires("./food");
const { ComboSchema } = requires("./combo");

const SaleSchema = new mongoose.Schema({
    soldFoods: [{
        type: FoodSchema,
        required: false
    }],
    soldCombos: [{
        type: ComboSchema,
        required: false
    }],
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Sale = mongoose.model("Sale", SaleSchema);
exports.Sale = Sale;
exports.SaleSchema = SaleSchema;
