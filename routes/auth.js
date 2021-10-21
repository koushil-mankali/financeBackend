const express = require("express");
const route = express.Router();

const authCont = require("../controllers/auth");

route.post("/login", authCont.login);

route.post("/signup", authCont.signup);

module.exports = route;