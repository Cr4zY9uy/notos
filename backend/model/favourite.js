const mongoose = require("mongoose");
const favourite_schema = new mongoose.Schema({
    items: [{
        title: String,
        price: Number,
        rating: Number,
        thumbnail: String,
        product_id: Number
    }]
});

module.exports = mongoose.model("favourite", favourite_schema);