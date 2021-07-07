import "./App.css"
import { useState, useEffect } from "react"
import DateTimePicker from "react-datetime-picker"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import CheckCategory from "./CheckCategory"
import StatCard from "./StatCard"

const App = () => {
  const [date, setDate] = useState(new Date())
  const [categories, setCategories] = useState({
    totals: true,
    producers: false,
    expiration: false,
    usage: false,
  })
  const [report, setReport] = useState({})

  useEffect(() => {}, [])

  const getReport = async () => {
    console.log(date.toISOString())
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: date.toISOString(), categories }),
    }
    const dbUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3003/api"
        : "http://vaccine-exercise-ilarijn.herokuapp.com/api"
    const res = await fetch(dbUrl, req)
    setReport(await res.json())
  }

  const handleCategorySelect = (categoryName) => {
    setCategories({ ...categories, [categoryName]: !categories[categoryName] })
  }

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand>vaccine-exercise-2021</Navbar.Brand>
      </Navbar>
      <Container fluid="md" style={{ paddingBottom: 50 }}>
        <Row className="justify-content-center mt-5 mb-2">
          <Col md="auto" xs="auto">
            <DateTimePicker onChange={setDate} value={date} />
          </Col>
        </Row>
        <Form>
          <Row className="justify-content-center mb-2">
            <CheckCategory
              label="Arrived totals"
              id="totals"
              handleChange={handleCategorySelect}
              checked={categories.totals}
            />
            <CheckCategory
              label="Arrived per producer"
              id="producers"
              handleChange={handleCategorySelect}
              checked={categories.producers}
            />
          </Row>
          <Row className="justify-content-center mb-2">
            <CheckCategory
              label="Usage"
              id="usage"
              handleChange={handleCategorySelect}
              checked={categories.usage}
            />
            <CheckCategory
              label="Expiration"
              id="expiration"
              handleChange={handleCategorySelect}
              checked={categories.expiration}
            />
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col md="auto" xs="auto">
            <Button
              variant="primary"
              block
              size="md"
              onClick={async () => {
                getReport()
              }}
            >
              Get report
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5 align-items-center">
          {Object.keys(report).map((stat, index) => {
            return (
              <StatCard
                figure={report[stat].result}
                description={report[stat].description}
                key={index}
              />
            )
          })}
        </Row>
      </Container>
    </>
  )
}

export default App
