const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
    product_id: Number,
    title: String,
    price: Number,
    description: String,
    rating: Number,
    qty: Number,
    weight: Number,
    thumbnail: String,
    category_name: String
},
    {
        timestamps: true
    })
module.exports = mongoose.model("products", product_schema);