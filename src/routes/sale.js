const express = require("express");
const SaleController = require("../controllers/salesController");
const router = express.Router();

router
.get("/getsales", SaleController.get)
.get("/getsalesbyid", SaleController.getById);

router
.post("/postsale", SaleController.post);

router
.delete("/clearsales", SaleController.clear)
.delete("/deletesale", SaleController.deleteById);

module.exports = router;
