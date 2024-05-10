const express = require("express");
const ComboController = require("../controllers/combosController");
const router = express.Router();

router
.get("/getcombos", ComboController.get)
.get("/getcombobyid", ComboController.getById);

router
.post("/postcombo", ComboController.post);

router
.delete("/clearcombos", ComboController.clear)
.delete("/deletecombo", ComboController.deleteById);

module.exports = router;
