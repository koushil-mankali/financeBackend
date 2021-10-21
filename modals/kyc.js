const mongoose = require("mongoose");

const {Schema} = mongoose;

const KYC = new Schema({
    panCardNo: {
        type:Number,
        required: true
    },
    panCardImg:{
        type: String,
        required: true
    },
    aadharNo: {
        type: Number,
        required: true
    },
    aadharImg: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("kyc", KYC)