const express = require("express");
const FoodController = require("../controllers/foodsController");
const router = express.Router();

router
.get("/getfoods", FoodController.get)
.get("/getfoodbyid", FoodController.getById);

router
.post("/postfood", FoodController.post);

router
.delete("/clearfoods", FoodController.clear)
.delete("/deletefood", FoodController.deleteById);

module.exports = router;
