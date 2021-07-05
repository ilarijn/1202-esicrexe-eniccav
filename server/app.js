const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const app = express()

const testService = require("./services/test")

app.get("/", async (req, res) => {
  const testRes = await testService.getTest()
  res.send(testRes)
})

module.exports = app
