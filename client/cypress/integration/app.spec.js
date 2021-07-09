describe("App", function () {
  const testDate = new Date("2021-03-20T11:10:06.473587Z")

  beforeEach(function () {
    cy.visit("http://localhost:3000")
  })

  it("opens normally", function () {
    cy.contains("vaccine-exercise-2021")
    cy.contains("Arrived")
    cy.contains("Usage")
    cy.contains("Expiration")
    cy.contains("Get report")
  })

  it("receives a report on submit", function () {
    cy.get("#getReport").click()
    cy.contains("Orders arrived")
    cy.contains("Vaccines arrived")
  })

  it("receives correct results on fixed date for default query", function () {
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__day"]'
    ).type(testDate.getUTCDate())
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__month"]'
    ).type((testDate.getUTCMonth() + 1).toString())
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__year"]'
    ).type(testDate.getUTCFullYear())
    cy.get("#getReport").click({ force: true })
    cy.contains("61")
    cy.contains("300")
  })

  it("receives all reports", function () {
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__day"]'
    ).type(testDate.getUTCDate())
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__month"]'
    ).type((testDate.getUTCMonth() + 1).toString())
    cy.get(
      '[class="react-datetime-picker__inputGroup__input react-datetime-picker__inputGroup__year"]'
    ).type(testDate.getUTCFullYear())
    cy.get("#producers").click({ force: true })
    cy.get("#usage").click()
    cy.get("#expiration").click()
    cy.get("#getReport").click()
    cy.get(".stat-card").should("have.length", 13)
  })
})
