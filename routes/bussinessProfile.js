const express = require("express");
const route = express.Router();

const bussinessCont = require("../controllers/bussinessProfile");

route.get("/bussiness-profile", bussinessCont.getData);

route.post("/add-bussiness-profile", bussinessCont.postData);

module.exports = route;