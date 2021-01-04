const express = require("express")
const axios = require("axios")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("hello world")
})

router.post("/", (req, res) => {
    res.send("U DON DID A POST!")
})

module.exports = router
