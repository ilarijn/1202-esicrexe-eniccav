const db = require("../db")

const getReport = async (options) => {
  const timestamp = options.date
  const categories = options.categories

  const report = {}

  if (categories.totals) {
    report[ordersArrivedOnDate] = await ordersArrivedOnDate(timestamp)
    report[vaccinesArrivedOnDate] = await vaccinesArrivedOnDate(timestamp)
  }

  if (categories.producers) {
    const perProducer = await ordersAndVaccinesPerProducerOnDate(timestamp)
    perProducer.forEach((producer) => {
      report[producer.producer + "Orders"] = {
        result: producer.orders,
        description: producer.producer + " orders arrived",
      }
      report[producer.producer + "Vaccines"] = {
        result: producer.injections,
        description: producer.producer + " vaccines arrived",
      }
    })
  }

  if (categories.usage) {
    report[vaccinesUsedOnDate] = await vaccinesUsedOnDate(timestamp)
  }

  if (categories.expiration) {
    report[bottlesExpiredOnDate] = await bottlesExpiredOnDate(timestamp)
    report[vaccinesExpiredBeforeUsage] = await vaccinesExpiredBeforeUsage(timestamp)
  }

  return report
}

const ordersArrivedOnDate = async (timestamp) => {
  const result = await db.query(
    "SELECT COUNT(*) AS result FROM orders WHERE arrived::DATE=$1::DATE",
    [timestamp]
  )
  return { ...result[0], description: "Orders arrived" }
}

const vaccinesArrivedOnDate = async (timestamp) => {
  const result = await db.query(
    "SELECT SUM(injections) AS result FROM orders WHERE arrived::DATE=$1::DATE",
    [timestamp]
  )
  return { ...result[0], description: "Vaccines arrived" }
}

const ordersAndVaccinesPerProducerOnDate = async (timestamp) => {
  const result = await db.query(
    "SELECT vaccine AS producer, COUNT(vaccine) AS orders, SUM(injections) AS injections FROM orders WHERE arrived::DATE =$1::DATE GROUP by vaccine;",
    [timestamp]
  )
  return result
}

const bottlesExpiredOnDate = async (timestamp) => {
  const result = await db.query(
    "SELECT COUNT(*) AS result FROM orders WHERE arrived::DATE =$1::DATE - interval '30' day",
    [timestamp]
  )
  return { ...result[0], description: "Bottles expired on this day" }
}

const vaccinesExpiredBeforeUsage = async (timestamp) => {
  const result = await db.query(
    'SELECT SUM(vaccines_left_on_date) as result FROM (SELECT id, (injections - used) AS vaccines_left_on_date, arrived FROM (SELECT orders.id, COUNT(vaccinations."sourceBottle") as used, orders.injections, orders.arrived FROM orders LEFT JOIN vaccinations ON orders.id = vaccinations."sourceBottle" WHERE arrived < $1 GROUP BY orders.id) AS usage WHERE arrived <= ($1 - interval \'30\' day)) AS results',
    [timestamp]
  )
  return { ...result[0], description: "Total vaccines expired before use" }
}

const vaccinesUsedOnDate = async (timestamp) => {
  const result = await db.query(
    'SELECT COUNT(*) AS result FROM vaccinations WHERE "vaccinationDate"::DATE=$1',
    [timestamp]
  )
  return { ...result[0], description: "Vaccines used on this day" }
}

module.exports = { getReport }
