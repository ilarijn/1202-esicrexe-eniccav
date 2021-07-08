const pg = require("pg")
require("dotenv").config()

const connectionString = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.DATABASE_URL
    case "development":
      return process.env.LOCAL_DATABASE_URL
    case "test":
      return process.env.TEST_DATABASE_URL
  }
})()

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
})

const query = async (sql, params) => {
  let result
  try {
    result = await pool.query(sql, params)
  } catch (e) {
    console.error(e)
  }
  return result ? result.rows : {}
}

module.exports = { query }
