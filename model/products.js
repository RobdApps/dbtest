const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    scoala: String,
    email: String,
    telefon: String,
    disciplina: String,
    varsta: String,
    sectiune: String,
    pregatire: String,
    moment: String,
    concurent: String,
    coregraf: String,
    participanti: String,
    durata: String,
    intrare: String,
    audioFiles: [String], 
    images: [String]
});

exports.Product = mongoose.model("Product", productSchema)
