const mongoose = require("mongoose");
const { FoodSchema } = requires("./food");

const ComboSchema = new mongoose.Schema({
    comboFoods: [{
        type: FoodSchema,
        required: false
    }],
    imagesList: {
        type: [String],
        required: true,
    }
});

const Combo = mongoose.model("Combo", ComboSchema);
exports.Combo = Combo;
exports.ComboSchema = ComboSchema;
