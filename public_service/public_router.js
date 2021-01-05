const express = require("express")
const axios = require("axios")

const router = express.Router()

const PRIVATE_SERVICE_URL = "http://0.0.0.0:3030"

router.get("/", (req, res) => {
    res.send()
})

router.get("/run/:run_name", (req, res) => {
    axios.get(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name)
	.then( (response) => {
	    res.send(response.data)
	}).catch( (err) => {
	    res.send(err)
	})
})

module.exports = router
