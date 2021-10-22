const mongoose = require("mongoose");

const {Schema} = mongoose;

const Transactions = new Schema({
    loanId: {
        type: Schema.Types.ObjectId,
        ref: "loan",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    loanStartDate: {
        type: Date,
    },
    loanClosingDate: {
        type: Date
    },
    actualDayOfPay: {
        type: Date
    },
    dateOfPaytment: {
        type: Date
    },
    payableAmount: {
        type: Number
    },
    payedAmount: {
        type: Number
    },
    dueAmount: {
        type: Number
    },
    date: {
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model("transactions", Transactions)