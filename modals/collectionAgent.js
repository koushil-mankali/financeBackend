const mongoose = require("mongoose");

const {Schema} = mongoose;

const CollectionAgent = new Schema({
    username: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    aadharNo: {
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