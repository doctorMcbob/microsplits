/*
  Postgres server

  The perpose of this server is to handle database interaction
*/
const fastify = require('fastify')({
    logger : true,
    ignoreTrailingSlash : true,
})

fastify.register(require("./routes/splits/index"), {})

const start = async () => {
  try {
    await fastify.listen(3030)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
