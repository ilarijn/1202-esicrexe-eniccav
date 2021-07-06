const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const app = express()

const statsService = require("./services/stats")
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("hello")
})

app.post("/api", async (req, res) => {
  const options = req.body
  const result = await statsService.getReport(options)
  res.send(result)
})

module.exports = app
