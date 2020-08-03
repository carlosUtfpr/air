const express = require("express");
const routes = express.Router();
const dataController = require("./app/controller/data");

routes.get("/", dataController.index);

routes.get("/showCounted", dataController.show);

module.exports = routes;