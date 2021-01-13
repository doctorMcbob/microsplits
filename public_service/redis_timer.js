const Redis = require("ioredis")
const redis = new Redis()

/*
  run anatomy

  "game": "Mario 64",
  "catagory": "16 Star",
  "splits": {
    "WF": 60000,
    "BOWSER": 60000
  },
  "time": 120000,
*/

async function newRun (game_name, catagory, splits) {
    await redis.set("game", game_name)
    await redis.set("catagory", catagory)
    await redis.hset("splits", splits)
    await redis.set("starttime", Date.now())
    await redis.set("time", 0)
}

async function split (split) {
    const now = Date.now()
    const starttime = await redis.get("starttime")

    redis.hset("splits", split, now - starttime)
    redis.set("time", now - starttime)
    return now - starttime
}


async function getJSON () {
    const run_json = {}
    run_json.game = await redis.get("game")
    run_json.catagory = await redis.get("catagory")
    run_json.splits = await redis.hgetall("splits")
    run_json.time = await redis.get("time")
    for (key in run_json.splits) {
	run_json.splits[key] = Number(run_json.splits[key])
    }
    return run_json
}


module.exports = {
    newRun  : newRun,
    split   : split,
    getJSON : getJSON,
    redis   : redis
}
