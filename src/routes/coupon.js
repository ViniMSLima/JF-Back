const express = require("express");
const CouponController = require("../controllers/couponsController");
const router = express.Router();

router
.get("/get", CouponController.get)
.get("/getbyid", CouponController.getById);

router
.post("/post", CouponController.post);

router
.delete("/clear", CouponController.clear)
.delete("/delete", CouponController.deleteById);

module.exports = router;
