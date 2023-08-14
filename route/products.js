const express = require('express')
const productController = require('../controller/products')

const router = express.Router()

router
    .get("/", productController.getAll)
    .get('/:id', productController.getOne)
    .post("/addMany", productController.addMany)
    .post("/addOne", productController.addOne)
    .put("/:id", productController.replace)
    .patch("/:id", productController.update)
    .delete("/:id", productController.delete)

exports.router = router