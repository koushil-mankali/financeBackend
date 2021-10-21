const mongoose = require("mongoose");

const {Schema} = mongoose;

const BussinessProfile = new Schema({
    companyName: {
        type:String
    },
    companyLogo: {
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
    aadharNo: {
        type: Number
    }
})

module.exports = mongoose.model("bussinessProfile", BussinessProfile)