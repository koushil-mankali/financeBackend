const mongoose = require("mongoose");

const {Schema} = mongoose;

const User = new Schema({
    username: {
        type:String
    },
    email:{
        type: String
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    status:{
        type: String
    },
    reference: {
        type: String
    },
    kycStatus:{
        type: String
    },
    kyc:{
        type:String,
        ref: "kyc"
    }
}, {timestamps: true})

module.exports = mongoose.model("user", User)