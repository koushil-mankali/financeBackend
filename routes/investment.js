const express = require("express");
const route = express.Router();

const investmentCont = require("../controllers/investment");

route.get("/investment-details", investmentCont.getInvestMentData);

route.post("/add-capital", investmentCont.addCapital);

module.exports = route;