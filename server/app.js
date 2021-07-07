const config = require("./utils/config")
require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const statsService = require("./services/stats")

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")))

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("hello")
  })
}

app.post("/api", async (req, res) => {
  const options = req.body
  const result = await statsService.getReport(options)
  res.send(result)
})

module.exports = app
