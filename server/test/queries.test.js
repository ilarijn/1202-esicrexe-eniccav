const db = require("../db")
const statsService = require("../services/stats")

const testDate = new Date("2021-03-19T12:00:00.000Z")

describe("expiration queries", () => {
  it("total vaccines expired before use returns correct result", async () => {
    const result = await statsService.vaccinesExpiredBeforeUsage(testDate)
    expect(Number(result.result)).toBe(5)
  })
  it("amount expiring in next 10 days returns correct result", async () => {
    const result = await statsService.vaccinesExpireInNextTenDays(testDate)
    expect(Number(result.result)).toBe(4)
  })
})

describe("usage queries", () => {
  it("total unexpired vaccines left returns correct result", async () => {
    const result = await statsService.totalVaccinesLeft(testDate)
    expect(Number(result.result)).toBe(20)
  })
  it("vaccines used on date returns correct result", async () => {
    const result = await statsService.vaccinesUsedOnDate(testDate)
    expect(Number(result.result)).toBe(1)
  })
})
