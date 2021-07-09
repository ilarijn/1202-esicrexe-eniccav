import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row"

const ReportCategories = ({ handleChange, categories }) => {
  return (
    <>
      <Row className="justify-content-center mb-2">
        <Form.Check
          inline
          label="Arrived totals"
          type="checkbox"
          id="totals"
          checked={categories.totals}
          onChange={() => handleChange("totals")}
        />
        <Form.Check
          inline
          label="Arrived per producer"
          type="checkbox"
          id="producers"
          checked={categories.producers}
          onChange={() => handleChange("producers")}
        />
      </Row>
      <Row className="justify-content-center mb-2">
        <Form.Check
          inline
          label="Usage"
          type="checkbox"
          id="usage"
          checked={categories.usage}
          onChange={() => handleChange("usage")}
        />
        <Form.Check
          inline
          label="Expiration"
          type="checkbox"
          id="expiration"
          checked={categories.expiration}
          onChange={() => handleChange("expiration")}
        />
      </Row>
    </>
  )
}

export default ReportCategories
