const express = require("express");
const {body} = require("express-validator");
const route = express.Router();

const authCont = require("../controllers/auth");

route.post("/login", [body('email').isEmail().withMessage("Please enter a valid Email!").normalizeEmail(), body('password').isLength({min: 6}).withMessage("Password length should be atleast 6!")], authCont.login);

route.post("/signup", [
    body("username").not().isEmpty().withMessage("Username is must!"), 
    body("email").isEmail().not().isEmpty().withMessage("Please enter a valid Email!").normalizeEmail(),
    body("password").isLength({min: 6}).not().isEmpty().withMessage("Password length should be atleast 6!")
    ], authCont.signup);

module.exports = route;