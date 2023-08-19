const model = require('../model/products')
const Product = model.Product

exports.addMany = (req, res) => {
    req.body.forEach(element => {
        const product = new Product(element)
        product.save()
    });
    res.status(201).json({status: "SUCCESS POST"})
}

exports.addOne = async (req, res) => {
    try {
        const newProductData = req.body;
        newProductData.audioFiles = req.files.map(file => file.filename); // Transform files into an array of filenames

        newProductData.audioNames = req.files.map(file => file.originalname);

        const product = new Product(newProductData);
        const savedProduct = await product.save();

        console.log("Saved product:", savedProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Error adding product' });
    }
}

exports.getAll = async (req, res) => {
    const allData = await Product.find()
    // console.log(allData)
    // res.status(200).json({status: "SUCCESS GET ALL"})
    res.status(200).json(allData)
    console.log("at", new Date, "from", req.ip)
}

exports.getOne = async (req, res) => {
    const Data = await Product.findById(req.params.id)
    console.log(Data)
    res.status(200).json({"status": "SUCCESS GET ONE"})
}

exports.update = async (req, res) => {
    const oldData = await Product.findByIdAndUpdate(req.params.id, {$set: req.body})
    const updatedData = await Product.findById(req.params.id)
    res.json({"oldData": oldData, "updatedData": updatedData})    
}

exports.replace = async (req, res) => {
    const replaceLog = await Product.replaceOne({_id: req.params.id}, req.body)
    const replacedData = await Product.findById(req.params.id)
    console.log(replaceLog)
    res.json({"replacedData": replacedData})    
}

exports.delete = async (req, res) => {
    const deletedData = await Product.findByIdAndDelete(req.params.id)
    res.json({"deletedData": deletedData}) 
}