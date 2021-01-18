const axios = require("axios")

const PRIVATE_SERVICE_URL = "http://0.0.0.0:3030"

async function getRunById (runId) {
    const response = await axios.get(`${PRIVATE_SERVICE_URL}/run/${runId}`)
    return response.data
}

async function getGames () {
    const response = await axios.get(`${PRIVATE_SERVICE_URL}/games/`)
    return response.data
}

async function getCategoriesOfGame (gameName) {
    const response = await axios.get(`${PRIVATE_SERVICE_URL}/games/${gameName}/categories/`)
    return response.data
}

async function getRunsByGameAndCategory (gameName, category) {
    const response = await axios.get(`${PRIVATE_SERVICE_URL}/runs/${gameName}/${category}/`)
    return response.data
}

module.exports = {
    getRunById,
    getGames,
    getCategoriesOfGame,
    getRunsByGameAndCategory
}
