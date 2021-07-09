import { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import ReportCategories from "./ReportCategories"
import StatCard from "./StatCard"

const App = () => {
  const [date, setDate] = useState(new Date())
  const [categories, setCategories] = useState({
    totals: true,
    producers: false,
    usage: false,
    expiration: false,
  })
  const [report, setReport] = useState({})
  const [loading, setLoading] = useState(false)

  const testDate = new Date("2021-04-12T11:10:06.473587Z")
  console.log(testDate.getUTCFullYear())

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
    setLoading(true)
    const res = await fetch(dbUrl, req)
    setReport(await res.json())
    setLoading(false)
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
            <DateTimePicker id="calendar" onChange={setDate} value={date} />
          </Col>
        </Row>
        <ReportCategories handleChange={handleCategorySelect} categories={categories} />
        <Row className="justify-content-center">
          <Col md="auto" xs="auto">
            <Button variant="primary" block size="md" id="getReport" onClick={getReport}>
              Get report
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5 align-items-center">
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            Object.keys(report).map((stat, index) => {
              return (
                <StatCard
                  figure={report[stat].result}
                  description={report[stat].description}
                  key={index}
                />
              )
            })
          )}
        </Row>
      </Container>
    </>
  )
}

export default App
