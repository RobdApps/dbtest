require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRouter = require('./route/products')
const indexRouter = require('./route/indexRouter')
const cors = require('cors')
const path = require('path')

const server = express()

main().catch( err => console.log(err) )

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connected")
}

// BODY PARSER
server.use(cors())
server.use(express.json())
// server.use(express.static(process.env.PUBLIC_DIR))

server.use("/", indexRouter.router)
server.use("/api/products", productRouter.router)
// server.use("*", (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
// })

server.listen(process.env.PORT, ()=>{
    console.log("server started")
})