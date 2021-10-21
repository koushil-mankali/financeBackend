const express = require("express");
const transCont = require("../controllers/transactions"); 

const route = express.Router();

route.post("/loan-transactions", transCont.previousTransactions);

route.post("/new-transaction", transCont.newTransaction);

module.exports = route;