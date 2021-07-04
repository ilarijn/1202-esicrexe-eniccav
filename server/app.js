const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello world")
})

module.exports = app
