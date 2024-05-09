const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code: [{
        type: String,
        required: false
    }],
    discount: {
        type: Number,
        required: true,
    }
});

const Coupon = mongoose.model("Coupon", CouponSchema);
exports.Coupon = Coupon;
exports.CouponSchema = CouponSchema;
