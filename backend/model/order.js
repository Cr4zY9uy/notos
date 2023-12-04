const mongoose = require("mongoose");
const orders_schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    phone: String,
    email: String,
    payment: String,
    shipping: String,
    items: [{
        title: String,
        thumbnail: String,
        quantity: Number,
        price: Number,
        product_id: Number,
    }],
    total: Number,
},
    {
        timestamps: true
    });
module.exports = mongoose.model("order", orders_schema);