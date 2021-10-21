const mongoose = require("mongoose");

const {Schema} = mongoose;

const Loan = new Schema({
    userId: {
        type:String,
        required: true
    },
    loanAmount: {
        type: Number,
    },
    dailyPayableAmount: {
        type: Number
    },
    payedAmount: {
        type: Number
    },
    dueAmount: {
        type: Number
    },
    interest: {
        type: Number
    },
    duration: {
        type: Number
    },
    loanStartDate: {
        type: Date
    },
    loanClosingDate: {
        type: Date
    },
    loanApproval: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("loan", Loan)