const mongoose = require("mongoose");

const {Schema} = mongoose;

const User = new Schema({
    userName: {
        type:String
    },
    userEmail:{
        type: String
    },
    userPhone: {
        type: Number,
    },
    userPassword: {
        type: String,
        required: true
    },
    userAddress: {
        type: String
    },
    status:{
        type: String
    },
    userReference: {
        type: String
    },
    kycStatus:{
        type: String
    },
    kyc:{
        type:String,
        ref: "kyc"
    },
    role:{
        type:String
    },
    transactions:[String]
}, {timestamps: true})

module.exports = mongoose.model("user", User)