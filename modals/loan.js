const mongoose = require("mongoose");

const {Schema} = mongoose;

const Loan = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
    durationType: String,
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