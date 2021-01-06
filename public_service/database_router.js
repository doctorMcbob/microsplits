const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const router = express.Router()
const jsonParser = bodyParser.json()

const PRIVATE_SERVICE_URL = "http://0.0.0.0:3030"

router.get("/", (req, res) => {
    res.send()
})
// Get the json data for a whole run
router.get("/run/:run_name", (req, res) => {
    axios.get(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name)
	.then( (response) => {
	    res.send(response.data)
	}).catch( (err) => {
	    res.send(err)
	})
})

// Get the names of the splits for a run
router.get("/splits/:run_name", (req, res) => {
    axios.get(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name)
	.then( (response) => {
	    json = {
		run         : req.params.run_name,
		split_names : [], 
	    }
	    for (var i = 0; i < response.data.length; i++) {
		for (var j = 0; j < response.data.length; j++) {
		    if (response.data[j].order == i) {
			json.split_names.push(response.data[j].name)
		    }
		}
	    }
	    res.send(json)
	}).catch( (err) => {
	    res.send(err)
	})
})

// upload a full run
router.post("/run/:run_name", jsonParser, (req, res) => {
    json = req.body
    axios.post(PRIVATE_SERVICE_URL + "/run/" + req.params.run_name, json).then( (response) => {
	res.send(response.data)
    }).catch( (err) => {
	res.send(err)
    })
})

// delete a full run
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
