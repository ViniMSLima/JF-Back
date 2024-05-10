const express = require("express");
const CouponController = require("../controllers/couponsController");
const router = express.Router();

router
.get("/getcoupons", CouponController.get)
.get("/getcouponbyid", CouponController.getById);

router
.post("/postcoupon", CouponController.post);

router
.delete("/clearcoupons", CouponController.clear)
.delete("/deletecoupon", CouponController.deleteById);

module.exports = router;
