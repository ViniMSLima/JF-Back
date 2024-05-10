const express = require("express");
const food = require("../src/routes/food");
const sale = require("../src/routes/sale");
const combo = require("../src/routes/combo");
const coupon = require("../src/routes/coupon");
const user = require("../src/routes/user");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/food", food)
    .use("/sale", sale)
    .use("/combo", combo)
    .use("/coupon", coupon)
    .use("/user", user);
};
