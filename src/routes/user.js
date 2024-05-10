const express = require("express");
const UserController = require("../controllers/usersController");
const router = express.Router();

router
.get("/getusers", UserController.get)
.get("/getusersbyid", UserController.getById);

router
.post("/postuser", UserController.post);

router
.delete("/clearusers", UserController.clear)
.delete("/deleteuser", UserController.deleteById);

module.exports = router;
