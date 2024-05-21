const express = require("express");
const UserController = require("../controllers/usersController");
const router = express.Router();

router
.get("/get", UserController.get)
.get("/getbyid", UserController.getById);

router
.post("/post", UserController.post)
.post('/login', UserController.login);

router
.patch("/update", UserController.updateById);

router
.delete("/clear", UserController.clear)
.delete("/delete", UserController.deleteById);



module.exports = router;
