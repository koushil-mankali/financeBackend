const mongoose = require("mongoose");

const {Schema} = mongoose;

const BussinessProfile = new Schema({
    companyName: {
        type:String
    },
    companyLogo: {
        type: String
    },
    companyAddress: {
        type: String
    },
    gstNo: {
        type: Number,
    },
    panNo: {
        type: String
    },
    aadharNo: {
        type: Number
    },
    capitalInvestment: {
        type: Number
    }
})

module.exports = mongoose.model("bussinessProfile", BussinessProfile)