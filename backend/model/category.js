const mongoose = require("mongoose");
const category_schema = new mongoose.Schema({
    category_id: Number,
    category_name: String,
})
module.exports = mongoose.model("categories", category_schema);