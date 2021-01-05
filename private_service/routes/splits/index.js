const Sequelize = require('sequelize')
const sequelize = new Sequelize('mySplits', 'postgres', process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
	max: 9,
	min: 0,
	idle: 10000,
    }
})

const Splits = sequelize.define('splits', {
    run : {
	type : Sequelize.STRING,
    },
    name : {
	type : Sequelize.STRING,
    },
    best : {
	type : Sequelize.INTEGER,
    },
    PB : {
	type : Sequelize.INTEGER,
    }
})

sequelize.authenticate().then(() => {
    Splits.sync({force: true})
    
}).catch((err) => {
    console.log(err)
})

module.exports = function(fastify, opts, done) {

    fastify.get("/run/:run_name", async (req, res) => {
	Splits.findAll({
	    where : {
		run : req.params.run_name
	    }
	}).then((data) => {
	    res.send(data)
	}).catch((err) => {
	    console.log(err)
	    res.send({error : err})
	})
    })

    fastify.post("/run/:run_name", async (req, res) => {
	run_name = req.params.run_name,
	split_names = req.body["splits"]
	for (var i = 0; i < split_names.length; i++) {
	    Splits.create({
		run  : run_name,
		name : split_names[i],
		best : null,
		PB   : null,
	    })
	}
	res.send({})
    })

    done()
}
