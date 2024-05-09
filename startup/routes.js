const express = require("express");
const food = require("../src/routes/food");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/api", food)
};
