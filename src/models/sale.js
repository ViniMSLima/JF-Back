const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
    soldFoodsIds: [{
        type: String,
        required: false
    }],
    soldCombosIds: [{
        type: String,
        required: false
    }],
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
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
