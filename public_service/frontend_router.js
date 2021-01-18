const express = require("express")

const api = require("./lib/api")

const router = express.Router()

/*
  home page | game list
    - catagories
  catagory list
    - runs
  run page
 */

router.get("/", (req, res) => {
    api.getGames().then((games) => {
	res.render("index", {games})
    }).catch((err) => {
	next(err)
    })
})

router.get("/tracker", (req, res) => {
    res.render("tracker", {})
})


router.get("/game/:game_name", (req, res) => {
    api.getCategoriesOfGame(req.params.game_name).then((categories) => {
	res.render("game", {categories, game: req.params.game_name})
    }).catch((err) => {
	next(err)
    })
})

router.get("/game/:game_name/:category", (req, res) => {
    api.getRunsByGameAndCategory(req.params.game_name, req.params.category).then((runs) => {
	res.render("category", {
	    runs,
	    game: req.params.game_name,
	    category: req.params.category,
	})
    }).catch((err) => {
	next(err)
    })
})

router.get("/run/:run_id", (req, res) => {
    api.getRunById(req.params.run_id).then((run) => {
	res.render("run", {run})
    }).catch((err) => {
	console.log(err)
    })
})

router.use((err, req, res, next) => {
    req.log.error(err)
    res.render("error", {err})
})

module.exports = router
