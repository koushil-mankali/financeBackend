const express = require("express");
const {body} = require("express-validator");
const isAuth = require("../middleware/isAuth");
const route = express.Router();

const bussinessCont = require("../controllers/bussinessProfile");

route.get("/bussiness-profile", bussinessCont.getData);

route.post("/add-bussiness-profile", isAuth, [
    body("companyName").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("companyAddress").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("gstNo").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("panNo").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("aadharNo").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("capitalInvestment").not().isEmpty().withMessage("Please fill all the Fields!"),
], bussinessCont.postData);

module.exports = route;