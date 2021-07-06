import Form from "react-bootstrap/Form"

const CheckCategory = ({ label, id, handleChange, checked }) => {
  return (
    <Form.Check
      inline
      label={label}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={() => handleChange(id)}
    />
  )
}

export default CheckCategory
