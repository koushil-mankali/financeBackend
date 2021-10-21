const express = require("express");
const {body} = require("express-validator");
const transCont = require("../controllers/transactions"); 

const route = express.Router();

route.post("/loan-transactions", [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
], transCont.previousTransactions);

route.post("/new-transaction", [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
    body("payedAmount").not().isEmpty().withMessage("Please fill all the Fields!"),
], transCont.newTransaction);

module.exports = route;