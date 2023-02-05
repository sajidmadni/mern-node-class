const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    permissions: [{type: mongoose.Types.ObjectId, required: false, ref: "User" }]
}, { toJSON: { getters: true } })

module.exports = mongoose.model("Product", productSchema);