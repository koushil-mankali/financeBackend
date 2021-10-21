const express = require("express");
const {body} = require("express-validator");
const userCont = require("../controllers/user"); 

const route = express.Router();

route.post("/create-user", [
    body("userName").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userEmail").isEmail().withMessage("Please Enter a valid Email!").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userPhone").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userPassword").isLength({min: 6}).withMessage("Password length should be atleast 6!").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userAddress").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userReference").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("status").not().isEmpty().withMessage("Please fill all the Fields!"),
], userCont.createUser);

route.post("/user-kyc", [
    body("userId").not().isEmpty().withMessage("Something went wrong!"),
    body("panCardNo").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("aadharNo").not().isEmpty().withMessage("Please fill all the Fields!")
], userCont.userKYC)

route.post("/calculate-loan-details", userCont.loanDetails)

module.exports = route;