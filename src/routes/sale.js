const express = require("express");
const SaleController = require("../controllers/salesController");
const router = express.Router();

router
.get("/get", SaleController.get)
.get("/getbyid", SaleController.getById);

router
.post("/post", SaleController.post);

router
.delete("/clear", SaleController.clear)
.delete("/delete", SaleController.deleteById);

module.exports = router;
