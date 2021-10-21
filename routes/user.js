const express = require("express");
const userCont = require("../controllers/user"); 

const route = express.Router();

route.post("/create-user", userCont.createUser);

route.post("/user-kyc", userCont.userKYC)

route.post("/calculate-loan-details", userCont.loanDetails)

module.exports = route;