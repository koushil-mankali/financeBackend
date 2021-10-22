const express = require("express");
const {body} = require("express-validator");
const isAuth = require("../middleware/isAuth");
const transCont = require("../controllers/transactions"); 

const route = express.Router();

route.get("/loan-transactions", isAuth, transCont.previousTransactions);

route.post("/user-loan-transactions", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
], transCont.userPreviousTransactions);

route.post("/user-previous-last-transaction", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
], transCont.userPreviousLastTransaction);

route.post("/new-loan-payment", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
], transCont.newLoanPayment);

route.post("/new-transaction", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
    body("payedAmount").not().isEmpty().withMessage("Please fill all the Fields!"),
], transCont.newTransaction);

module.exports = route;