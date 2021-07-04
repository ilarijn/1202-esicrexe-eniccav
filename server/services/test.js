const db = require("../db")

const getTest = async () => {
  const res = await db.query("SELECT * from test")
  console.log(res)
  return res
}

module.exports = { getTest }
