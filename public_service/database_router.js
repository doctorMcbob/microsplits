const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const router = express.Router()
const jsonParser = bodyParser.json()

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

router.post("/run/:run_name", jsonParser, (req, res) => {
    json = req.body
    axios.post(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name, json).then( (response) => {
	res.send(response.data)
    }).catch( (err) => {
	res.send(err)
    })
})

router.delete("/run/:run_name", (req, res) => {
    axios.delete(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name)
	.then( (response) => {
	    res.send(response.data)
	}).catch( (err) => {
	    res.send(err)
	})
})

router.patch("/run/:run_name", jsonParser, (req, res) => {
    json = req.body
    axios.patch(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name, json).then( (response) => {
	res.send(response.data)
    }).catch( (err) => {
	res.send(err)
    })
})

module.exports = router
