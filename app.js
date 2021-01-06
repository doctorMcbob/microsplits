const Timer = require("./timer.js")
const axios = require("axios")

PUBLIC_SERVICE_URL = "http://0.0.0.0:3000"

async function get_splits (name_of_run) {
    response = await axios.get(PUBLIC_SERVICE_URL + "/splits/" + name_of_run)
    return response.data
}

