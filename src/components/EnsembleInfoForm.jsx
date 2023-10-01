import {
  Row,
  Col,
  Dropdown,
  Container,
  Tooltip,
  Card,
  Button,
  Badge,
  Table,
  DropdownButton,
} from "react-bootstrap";

import DataForm from "./common/DataForm";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import DescriptedClickable from "./common/DescriptedClickable";

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

function EnsembleSelectionMenu() {
  return (
    <Container>
      <Row>
        <DescriptedClickable headerText={"Select an Ensemble"}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Ensemble A
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Ensemble A</Dropdown.Item>
              <Dropdown.Item>Ensemble B</Dropdown.Item>
              <Dropdown.Item>Ensemble C</Dropdown.Item>
              <Dropdown.Item>Ensemble D</Dropdown.Item>
              <Dropdown.Item>Ensemble E</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </DescriptedClickable>
      </Row>
    </Container>
  );
}

function EnsembleMetaData() {
  return (
    <Container>
      <Row>Total number of plans</Row>
      <Row>1000</Row>
      <Row>Average distance</Row>
      <Row>0.6</Row>
    </Container>
  );
}

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
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  Select an Ensemble for Cluster Analysis
                </Card.Header>
                <Card.Body>
                  <Row className="justify-content-center text-center">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Dropdown button"
                      className="mb-3"
                    >
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </DropdownButton>
                  </Row>

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
            <Card.Header>Ensemble Graph Analysis</Card.Header>
            <Card.Body>
              <EnsembleAssociationGraph />
              <Button variant="outline-primary" size="sm">
                Learn More...
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
