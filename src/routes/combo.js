const express = require("express");
const ComboController = require("../controllers/combosController");
const router = express.Router();

router
.get("/get", ComboController.get)
.get("/getbyid", ComboController.getById);

router
.post("/post", ComboController.post);

router
.patch("/update", ComboController.updateById);

router
.delete("/clear", ComboController.clear)
.delete("/delete", ComboController.deleteById);

module.exports = router;
