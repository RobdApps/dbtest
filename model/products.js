const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    images: [ String ]
})

exports.Product = mongoose.model("Product", productSchema)
