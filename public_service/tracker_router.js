const express = require("express")
const axios = require("axios")
const timer = require("./redis_timer")

const bodyParser = require("body-parser")

const router = express.Router()
const jsonParser = bodyParser.json()

const PRIVATE_SERVICE_URL = "http://0.0.0.0:3030"

// SPLIT
router.post("/split/:split_name", (req, res) => {
    timer.split(req.params.split_name)
	.then((time) => {
	    res.send(time.toString())
	})
	.catch(res.send)
})

// NEW RUN (use for reset)
router.post("/new/", jsonParser, (req, res) => {
    timer.newRun(req.body.game, req.body.catagory, req.body.splits)
	.then(() => {
	    res.sendStatus(200)
	})
	.catch(res.send)
})

// FINISH
router.post("/finish/", (req, res) => {
    timer.getJSON()
	.then((run_json) => {
	    axios.post(PRIVATE_SERVICE_URL + "/run/", run_json)
		.then((response) => {
		    res.send(response.data)
		})
		.catch(res.send)
	})
})

module.exports = router
