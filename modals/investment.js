const mongoose = require("mongoose");

const {Schema} = mongoose;

const Investment = new Schema({
    capitalAmount: {
        type:String,
        required: true
    },
    profitLoss: {
        type: Number,
    },
    totalInvestment: {
        type: Number
    },
    date: {
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model("investment", Investment)