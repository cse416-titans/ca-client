import { Row, Col, Tooltip, Card, Button, Badge, Table } from "react-bootstrap";

import DataForm from "../common/DataForm";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/*
 * Placeholder for basic info about the set of ensembles that user selected
 * Info includes: 1) total number of random district plans (number), 2) average distance between distance plan pairs (number)
 * Option includes: 1) ensemble selection dropdown menu
 */

const data = [
  {
    name: "Ensemble A",
    uv: 4000,
    pv: 200,
    amt: 2400,
  },
  {
    name: "Ensemble B",
    uv: 3000,
    pv: 698,
    amt: 2210,
  },
  {
    name: "Ensemble C",
    uv: 2000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: "Ensemble D",
    uv: 2780,
    pv: 4908,
    amt: 2000,
  },
  {
    name: "Ensemble E",
    uv: 1890,
    pv: 4908,
    amt: 2181,
  },
];

function EnsembleAssociationGraph() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={100} height={100} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function EnsembleInfoForm() {
  return (
    <DataForm headerText={"EnsembleInfoForm"}>
      <Row>
        <Col lg={6}>
          <Row className="mb-3">
            <Col>
              <Card>
                <Card.Header>Ensemble Overview</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Total number of ensembles</td>
                        <td>
                          <Badge bg="secondary">5</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>No. of plans in an ensemble</td>
                        <td>
                          <Badge bg="secondary">5</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Avg. distance between plan pairs</td>
                        <td>
                          <Badge bg="secondary">5</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Button variant="outline-primary" size="sm">
                    Learn More...
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Header>Ensemble Size Bound</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Table striped bordered hover className="text-center">
                    <tbody>
                      <tr>
                        <td>
                          Maximum Ensemble Size Required to Identify All Plans
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Badge bg="secondary">10000</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
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
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Select an Ensemble for Cluster Analysis</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>Small</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        ~100 Plans
                      </Card.Subtitle>
                      <Card.Text>
                        Easier to search and identify individual clusters/plans,
                        but may not guarantee all possible clusters.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>Medium</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        ~1000 Plans
                      </Card.Subtitle>
                      <Card.Text>Moderation between small and large.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>Large</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        5000~ Plans
                      </Card.Subtitle>
                      <Card.Text>
                        Harder to search and identify individual clusters/plans,
                        but can look through possible clusters.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    See More Ensembles...
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
      </Row>
    </DataForm>
  );
}
