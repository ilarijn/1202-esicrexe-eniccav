const pg = require("pg")
require("dotenv").config()

const connectionString = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.DATABASE_URL
    case "test":
      return process.env.TEST_DATABASE_URL
    case "local":
      return process.env.LOCAL_DATABASE_URL
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

let client

const connect = async () => {
  client = await pool.connect()
}

connect()

const query = async (text, params) => {
  try {
    if (!client) {
      await connect()
    }
    const result = await client.query(text, params)
    const results = result ? result.rows : null
    return results
  } catch (e) {
    console.error(e)
    throw err
  }
}

module.exports = { query }
