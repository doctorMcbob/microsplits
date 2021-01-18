const { sequelize, Run } = require("./models")

const bodySchema = {
    body: {
	type : "object",
	required : ["game", "catagory", "splits"],
	properties : {
	    game : { type : "string" },
	    catagory : { type : "string" },
	    splits : { type : "object" },
	    time : { type : "integer"},
	}
    }
}

const paramSchema = {
    params : {
	type : "object",
	properties : {
	    gameName : { type : "string" },
	    gameCategory : { type : "string" },
	    runId : { type : "integer" }
	}
    }
}

function makeSchema (param={}, model={}) {
    return { schema : Object.assign({}, param, model) }
}

module.exports = function(fastify, opts, done) {

    fastify.get("/run/:runId", makeSchema(paramSchema), async (req, res) => {
	const run = await Run.findByPk(req.params.runId)

	res.send(run)
    })


    fastify.get("/games/:gameName", makeSchema(paramSchema), async (req, res) => {
	const runs = await Run.findAll({
	    where : {
		game : req.params.gameName
	    }
	})

	res.send(runs)
    })

    fastify.get("/games/:gameName/categories/", async (req, res) => {
	const [ categories ] = await sequelize.query(`SELECT DISTINCT catagory FROM "Runs" WHERE game='${req.params.gameName}';`)

	const categoryList = categories.map((element, index, array) => {
	    return element.catagory
	})

	res.send(categoryList)
    })
    
    fastify.get("/runs/:gameName/:categoryName", makeSchema(paramSchema), async (req, res) => {
	const runs = await Run.findAll({
	    where : {
		game : req.params.gameName,
		catagory : req.params.categoryName
	    }
	})

	res.send(runs)
    })

    fastify.get("/games/", async (req, res) => {
	const [ games ] = await sequelize.query('SELECT DISTINCT game FROM "Runs";')


	const gameList = games.map((element, index, array) => {
	    return element.game
	})

	res.send(gameList)
    })

    fastify.post("/run", makeSchema({}, bodySchema), async (req, res) => {
	const run = await Run.create(req.body)
	
	res.send(run)
    })

    fastify.delete("/run/:runId", makeSchema(paramSchema), async (req, res) => {
	const run = await Run.findByPk(req.params.runId)

	await Run.destroy({
	    where : {
		id : req.params.runId,
	    }
	})
	res.send(run)
    })

    fastify.put("/run/:runId", makeSchema(paramSchema, {}), async (req, res) => {
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
