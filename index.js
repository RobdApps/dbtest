require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const productRouter = require('./route/products');
const indexRouter = require('./route/indexRouter');
const cors = require('cors');
const model = require('./model/products');
const Product = model.Product;

const server = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

server.use(cors());
server.use(express.json());

server.use("/", indexRouter.router);
server.use("/api/products", productRouter.router);


server.use('/uploads', express.static('uploads'));

server.post('/api/products', upload.array('audioFiles', 5), async (req, res) => {
    try {
        console.log("Received POST request for creating a new product");
        
        console.log("Request body:", req.body);
        console.log("Uploaded files:", req.files);
        
        const newProduct = req.body;
        newProduct.audioFiles = req.files.map(file => file.filename);
        console.log("New product data:", newProduct);
        
        const createdProduct = await Product.create(newProduct);
        console.log("Created product:", createdProduct);
        
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
});

server.listen(process.env.PORT, () => {
    console.log("Server started");
});
