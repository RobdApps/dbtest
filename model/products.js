const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    discountPercentage: mongoose.Types.Decimal128,
    rating: mongoose.Types.Decimal128,
    stock: Number,
    brand: {type: String, required: true},
    category: String,
    images: [ String ]
})

exports.Product = mongoose.model("Product", productSchema)
