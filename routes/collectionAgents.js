const express = require("express");
const {body} = require("express-validator");
const route = express.Router();

const collectionAgentsCont = require("../controllers/collectionAgents");

route.get("/all-agents", collectionAgentsCont.AllCollectionAgents);

route.post("/create-collection-agent",[
    body("agentName").not().isEmpty().withMessage("Please Fill all the Fields!"),
    body("agentEmail").not().isEmpty().withMessage("Please Fill all the Fields!"),
    body("agentPhone").not().isEmpty().withMessage("Please Fill all the Fields!"),
    body("agentPassword").not().isEmpty().withMessage("Please Fill all the Fields!"),
    body("agentAddress").not().isEmpty().withMessage("Please Fill all the Fields!"),
    body("agentAadharNo").not().isEmpty().withMessage("Please Fill all the Fields!"),
], collectionAgentsCont.createCollectionAgent);

module.exports = route;