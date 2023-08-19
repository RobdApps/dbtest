const express = require('express')
const router = express.Router()

router.get("/", (req, res)=> {
    res.json({"status": "OK"})
    console.log("index at", new Date, "from", req.ip)
})

exports.router = router