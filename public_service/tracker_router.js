const express = require("express")
const axios = require("axios")
const timer = require("./redis_timer")

const bodyParser = require("body-parser")

const router = express.Router()
const jsonParser = bodyParser.json()

const PRIVATE_SERVICE_URL = "http://0.0.0.0:3030"

// SPLIT
router.post("/tracker/split/:split_name", (req, res) => {
    // validation happens in timer.split, will throw error if split_name is not a valid split
    timer.split(req.params.split_name)
	.then((time) => {
	    res.send(time.toString())
	})
	.catch((err) => {
	    console.log(err)
	    res.send(err)
	})
})

// NEW RUN (use for reset)
router.post("/tracker/new/", jsonParser, (req, res) => {
    timer.newRun(req.body.game, req.body.catagory, req.body.splits)
	.then(() => {
	    res.sendStatus(200)
	})
	.catch((err) => {
	    res.send(err)
	})
})

// FINISH
router.post("/tracker/finish/", (req, res) => {
    timer.getJSON()
	.then((run_json) => {
	    axios.post(`${PRIVATE_SERVICE_URL}/run/`, run_json)
		.then((response) => {
		    res.send(response.data)
		})
		.catch((err) => {
		    res.send(err)
		})
	})
})

module.exports = router
