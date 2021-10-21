const express = require("express");
const route = express.Router();

const collectionAgentsCont = require("../controllers/collectionAgents");

route.get("/all-agents", collectionAgentsCont.AllCollectionAgents);

route.post("/create-collection-agent", collectionAgentsCont.createCollectionAgent);

module.exports = route;