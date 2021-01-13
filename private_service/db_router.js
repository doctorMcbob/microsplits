const { Run } = require("./models")

const bodySchema = {
    body: {
	tpye : "object",
	required : ["game", "catagory", "splits"],
	properties : {
	    game : { type : "string" },
	    catagory : { type : "string" },
	    splits : { type : "object" },
	    time : { type : "integer"},
	}
    }
}

const runidSchema = {   
    params : {
	type : "object",
	properties : {
	    runId : { type : "integer" }
	}
    }
}

const gamenameSchema = {
    params : {
	type : "object",
	properties : {
	    gameName : { type : "string" }
	}
    }
}

function makeSchema (param={}, model={}) {
    return { schema : Object.assign({}, param, model) }
}

module.exports = function(fastify, opts, done) {

    fastify.get("/run/:runId", makeSchema(runidSchema), async (req, res) => {
	const run = await Run.findByPk(req.params.runId)

	res.send(run)
    })


    fastify.get("/game/:gameName", makeSchema(gamenameSchema), async (req, res) => {
	const runs = await Run.findAll({
	    where : {
		game : req.params.gameName
	    }
	})

	res.send(runs)
    })

    fastify.post("/run", makeSchema({}, bodySchema), async (req, res) => {
	const run = await Run.create(req.body)
	
	res.send(run)
    })

    fastify.delete("/run/:runId", makeSchema(runidSchema), async (req, res) => {
	const run = await Run.findByPk(req.params.runId)

	await Run.destroy({
	    where : {
		id : req.params.runId,
	    }
	})
	res.send(run)
    })

    fastify.put("/run/:runId", makeSchema(runidSchema, {}), async (req, res) => {
	const run = await Run.findByPk(req.params.runId)
	
	if (!run) {
	    return res.code(404).send(null)
	}

	await run.update(req.body)
	await run.reload()

	res.send(run)
    })

    done()
}
