import Card from "react-bootstrap/Card"

const StatCard = ({ figure, description }) => {
  return (
    <Card className="text-center mx-1 my-1" style={{ width: "18rem", height: "6rem" }}>
      <Card.Header className="pb-0">
        <Card.Title>
          <b>{figure || 0}</b>
        </Card.Title>
      </Card.Header>
      <Card.Text className="mt-2">{description}</Card.Text>
    </Card>
  )
}

export default StatCard
