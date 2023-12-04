const mongoose = require("mongoose");
const cart_schema = new mongoose.Schema({
    items: [
        {
            title: String,
            price: Number,
            quantity: Number,
            thumbnail: String,
            product_id: Number
        }
    ]
});

module.exports = mongoose.model("cart", cart_schema);