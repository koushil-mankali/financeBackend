const express = require("express");
const {body} = require("express-validator");
const isAuth = require("../middleware/isAuth");
const route = express.Router();

const investmentCont = require("../controllers/investment");

route.get("/investment-details", investmentCont.getInvestMentData);

route.post("/add-capital", isAuth, [
    body("addCapital").not().isEmpty().withMessage("Please enter amount!")
], investmentCont.addCapital);

module.exports = route;