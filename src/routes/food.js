const express = require("express");
const FoodController = require("../controller/foodsController");
const router = express.Router();

router
.get("/getfoods", FoodController.getFoods)
.get("/clearfoods", FoodController.clearFoods);

router
.post("/postfoods", FoodController.postFood);

module.exports = router;
