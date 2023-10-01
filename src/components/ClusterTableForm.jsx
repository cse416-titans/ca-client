import {
  Container,
  Table,
  Row,
  Col,
  Card,
  Button,
  Stack,
} from "react-bootstrap";

import DataForm from "./common/DataForm";
import TableExample from "./TableExample";

function ClusterTable() {
  return (
    <Container className="overflow-y-scroll" style={{ height: "500px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cluster</th>
            <th>Voting Margin</th>
            <th>Demographic Margin</th>
            <th>Income Margin</th>
            <th>Compactness Index</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 100 }).map((_, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default function ClusterTableForm() {
  return (
    <DataForm headerText={"ClusterTableForm"}>
      <Row className="mb-3">
        <Col lg={12}>
          <Card>
            <Card.Header>Clustered Summary of Ensemble #1</Card.Header>
            <Card.Body className="p-0">
              <Row>
                <Col>
                  <TableExample />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Stack direction="horizontal" gap={3}>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-success"
                    >
                      {"Open in New Window..."}
                    </Button>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-primary"
                    >
                      {"Download .CSV..."}
                    </Button>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-primary"
                      style={{ float: "right" }}
                    >
                      {"Learn More..."}
                    </Button>
                  </Stack>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Filter & View</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    Adjust Filter...
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    Change View Settings...
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-primary" size="sm">
                    Learn More...
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Filter & View</Card.Header>
            <Card.Body>hello</Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
