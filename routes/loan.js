const express = require("express");
const route = express.Router();

const loanCont = require("../controllers/loan");

route.get("/loans-data", loanCont.loansData);

route.post("/loan-request", loanCont.takeLoan);

route.get("/all-loans-requests", loanCont.loanRequests);

route.post("/loans-approvel", loanCont.loanApproval);

route.get("/rejected-loans", loanCont.rejectedLoans);

module.exports = route;