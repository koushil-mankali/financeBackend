const express = require("express");
const route = express.Router();

const homeCont = require("../controllers/home");

route.get("/", homeCont.getHome);

module.exports = route;