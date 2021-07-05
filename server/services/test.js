const db = require("../db")

const getTest = async () => {
  const res = await db.query("SELECT * from vaccinations")
  return res
}

module.exports = { getTest }
