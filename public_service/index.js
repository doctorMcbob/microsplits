const express = require("express")

const pino = require("pino")()
const logger = require("pino-http")({logger : pino})

const trackerRouter = require("./tracker_router")
const frontendRouter = require("./frontend_router")


const app = express()

app.set("view engine", "pug")

app.use(logger)

app.use("/public", express.static("public"))

app.use((req, res, next) => {
    req.log.info("new request", {
	"date":	Date.now(),
	"method": req.method,
	"url": req.originalUrl,
    })
    next()
})

app.use(trackerRouter)
app.use(frontendRouter)


app.use((err, req, res, next) => {
    req.log.error(err)
    res.send(500)
})



app.listen(3000, () => {
    pino.info("booting up!")
})
