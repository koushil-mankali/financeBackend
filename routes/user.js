const express = require("express");
const {body} = require("express-validator");
const userCont = require("../controllers/user"); 
const isAuth = require("../middleware/isAuth");

const route = express.Router();

route.get("/all-users", userCont.getAllUsers);

route.post("/create-user", isAuth, [
    body("userName").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userEmail").isEmail().withMessage("Please Enter a valid Email!").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userPhone").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userPassword").isLength({min: 6}).withMessage("Password length should be atleast 6!").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userAddress").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("userReference").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("status").not().isEmpty().withMessage("Please fill all the Fields!"),
], userCont.createUser);

route.post("/user-kyc", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went wrong!"),
    body("panCardNo").not().isEmpty().withMessage("Please fill all the Fields!"),
    body("aadharNo").not().isEmpty().withMessage("Please fill all the Fields!")
], userCont.userKYC)

route.post("/delete-user", isAuth, [
    body("userId").not().isEmpty().withMessage("Something went wrong!")
], userCont.removeUser)

module.exports = route;