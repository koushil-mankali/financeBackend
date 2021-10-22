const mongoose = require("mongoose");

const {Schema} = mongoose;

const CollectionAgent = new Schema({
    agentName: {
        type:String,
        required: true
    },
    agentEmail:{
        type: String,
        required: true
    },
    agentPhone: {
        type: Number,
        required: true
    },
    agentPhoto: {
        type: String
    },
    agentPassword: {
        type: String,
        required: true
    },
    agentAddress: {
        type: String,
        required: true
    },
    agentAadharNo: {
        type: Number,
        required: true
    },
    users: {
        type: [String]
    },
    role:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("collectionAgent", CollectionAgent)