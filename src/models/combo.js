const mongoose = require("mongoose");

const ComboSchema = new mongoose.Schema({
    productsIds: {
        type: [String],
        required: true
    },
    imagesList: {
        type: [String],
        required: true,
    }
});

const Combo = mongoose.model("Combo", ComboSchema);
exports.Combo = Combo;
exports.ComboSchema = ComboSchema;
