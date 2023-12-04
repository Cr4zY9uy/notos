const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    birthday: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    favourite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'favourite'
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }],
})
module.exports = mongoose.model("users", user_schema);