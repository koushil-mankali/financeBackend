const mongoose = require("mongoose");

const {Schema} = mongoose;

const KYC = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    panCardNo: {
        type:String,
        required: true
    },
    panCardImg:{
        type: String
    },
    aadharNo: {
        type: Number,
        required: true
    },
    aadharImg: {
        type: String
    },
    userPhoto: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("kyc", KYC)