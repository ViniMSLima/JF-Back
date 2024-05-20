const express = require("express");
const FoodController = require("../controllers/foodsController");
const router = express.Router();

router
.get("/get", FoodController.get)
.get("/getbyid", FoodController.getById);

router
.post("/post", FoodController.post);

router
.patch("/update", FoodController.updateById);

router
.delete("/clear", FoodController.clear)
.delete("/delete", FoodController.deleteById);

module.exports = router;
