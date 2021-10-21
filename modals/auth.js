const mongoose = require("mongoose");

const {Schema} = mongoose;

const Auth = new Schema({
    username: String,
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("auth", Auth)