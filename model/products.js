const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    rating: mongoose.Types.Decimal128,
    category: { type: String, default: "copii" },
    images: [String]
})

exports.Product = mongoose.model("Product", productSchema)
