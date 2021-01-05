const express = require("express")
const logger = require("perfect-logger") //apparently its perfect

const database_router = require("./database_router")

logger.initialize('MyLog', {
    logLevelFile: 0,
    logLevelConsole: 0,
    logDirectory: "logs/",
    customBannerHeaders: "Split Log",
})

const app = express()

app.use((req, res, next) => {
    logger.info("new request", {
	"date":	Date.now(),
	"method": req.method,
	"url": req.originalUrl,
    })
    next()
})

app.use("/", database_router)

app.use((err, req, res, next) => {
    logger.crit(err)
    res.send(500)
})

app.listen(3000)
