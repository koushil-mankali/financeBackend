const express = require("express");
const {body} = require("express-validator");
const isAuth = require("../middleware/isAuth");
const route = express.Router();

const loanCont = require("../controllers/loan");

route.post("/loans-data", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
], loanCont.loansData);

route.get("/loans", isAuth, loanCont.allLoans);

route.post("/loan-request", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanAmount").not().isEmpty().withMessage("Please fill all the fields!"),
    body("interest").not().isEmpty().withMessage("Please fill all the fields!"),
    body("durationType").not().isEmpty().withMessage("Please fill all the fields!"),
    body("duration").not().isEmpty().withMessage("Please fill all the fields!"),
    body("loanStartDate").not().isEmpty().withMessage("Please fill all the fields!"),
    body("loanClosingDate").not().isEmpty().withMessage("Please fill all the fields!"),
], loanCont.takeLoan);

route.get("/all-loans-requests", loanCont.loanRequests);

route.post("/loans-approvel", isAuth, [
    body("loanId").not().isEmpty().withMessage("Something went Wrong!"),
    body("userId").not().isEmpty().withMessage("Something went Wrong!"),
    body("loanApproval").not().isEmpty().withMessage("Please fill all the Fields!"),
], loanCont.loanApproval);

route.get("/rejected-loans", loanCont.rejectedLoans);

route.post("/approve-loans", isAuth, loanCont.loanApproval);

route.post("/calculate-loan-details", isAuth, loanCont.calculateLoanDetails)

module.exports = route;