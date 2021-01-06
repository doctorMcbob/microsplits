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

/*
  ~~ split ~~
  run   : name of run
  order : order of split, first split in the run vs fifth
  name  : name of the split
  best  : fastest time ever     (miliseconds)
  PB    : split time in PB run  (miliseconds)

  ~~ example ~~
  run   : Mario 64 16 Star
  order : 0
  name  : Whomps Fortress
  best  : 600000
  PB    : 600000
*/

const Splits = sequelize.define('splits', {
    run   : {
	type : Sequelize.STRING,
	allowNull : false,
    },
    order : {
	type : Sequelize.INTEGER,
	allowNull : true,
    },
    name  : {
	type : Sequelize.STRING,
	allowNull : false,
    },
    best  : {
	type : Sequelize.INTEGER,
	allowNull : true,
    },
    PB    : {
	type : Sequelize.INTEGER,
	allowNull : true,
    }
})

sequelize.authenticate().then(() => {
    Splits.sync({force: true})
    
}).catch((err) => {
    console.log(err)
})

// Quick note, assume that sent splits are PB
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

    // POST send in a run
    fastify.post("/run/:run_name", async (req, res) => {
	var run_name = req.params.run_name
	var split_names = req.body.splits
	if ("best" in req.body) {
	    var bests = req.body.best
	} else {
	    var bests = [null]
	}
	if ("PB" in req.body) {
	    var PBs = req.body.PB
	} else {
	    var PBs = [null]
	}
	
	for (var i = 0; i < split_names.length; i++) {
	    var [split, is_new] = await Splits.findOrCreate({
		where : {
		    run  : run_name,
		    name : split_names[i],
		}
	    })
	    split.order = i
	    if (is_new || bests[i % bests.length] < split.best) {
		split.best = bests[i % bests.length]
	    }
	    if (is_new || split.PB == null) {
		split.PB = PBs[i % PBs.length]
	    }
	    await split.save()
	}

	res.send({})
    })

    fastify.delete("/run/:run_name", async (req, res) => {
	var run_name = req.params.run_name
	Splits.destroy({
	    where : {
		run : run_name
	    }
	}).catch((err) => {
	    res.send(err)
	})

	res.send({})
    })

    fastify.patch("/run/:run_name", async (req, res) => {
	var run_name = req.params.run_name
	var split_name = req.body.split
	var split_time = req.body.time
	var order = req.body.order
	var [split, is_new] = await Splits.findOrCreate({
	    where : {
		run  : run_name,
		name : split_name, 
	    }
	}).catch((err) => {
	    res.send(err)
	})
	if (is_new) {
	    split.order = order
	}
	if (is_new || split_time < split.best) {
	    split.best = split_time
	}
	split.PB = split_time
	split.save()
	
	res.send({})
    })
    done()
}
