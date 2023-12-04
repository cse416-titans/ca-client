import {
  Row,
  Col,
  Tooltip,
  Card,
  Button,
  Badge,
  Table,
  Modal,
  Dropdown,
  Alert,
} from "react-bootstrap";

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

import { useState } from "react";
import { exampleEnsembleArr } from "../../assets/makeData";

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

export default function EnsembleInfoForm({
  selectedEnsemble,
  setselectedEnsemble,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                  <Card
                    bg={selectedEnsemble === 1 ? "primary" : "light"}
                    text={selectedEnsemble === 1 ? "white" : ""}
                    onClick={() => setselectedEnsemble(1)}
                    className="h-100 selectable"
                  >
                    <Card.Body>
                      <Card.Title>Small</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{
                          color: selectedEnsemble === 1 ? "white" : "",
                        }}
                      >
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
                  <Card
                    bg={selectedEnsemble === 2 ? "primary" : "light"}
                    text={selectedEnsemble === 2 ? "white" : ""}
                    onClick={() => setselectedEnsemble(2)}
                    className="h-100 selectable"
                  >
                    <Card.Body>
                      <Card.Title>Medium</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{
                          color: selectedEnsemble === 2 ? "white" : "",
                        }}
                      >
                        ~1000 Plans
                      </Card.Subtitle>
                      <Card.Text>Moderation between small and large.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card
                    bg={selectedEnsemble === 3 ? "primary" : "light"}
                    text={selectedEnsemble === 3 ? "white" : ""}
                    onClick={() => setselectedEnsemble(3)}
                    className="h-100 selectable"
                  >
                    <Card.Body>
                      <Card.Title>Large</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{
                          color: selectedEnsemble === 3 ? "white" : "",
                        }}
                      >
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
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={handleShow}
                    >
                      See More Ensembles...
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Select an Ensemble</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <Alert variant="success">
                              <Alert.Heading>
                                Selecting an Ensemble is the real start of your
                                analysis.
                              </Alert.Heading>
                              <p>
                                We've prepared a few example ensembles for you.
                                Not sure which one to choose? Read several
                                considerations below to help you decide:
                              </p>
                              <p>
                                1. There is a trade-off between the quality and
                                speed. The larger the ensemble, the more likely
                                your analysis is more accurate. However, it will
                                be harder to search through all the individual
                                plans of your choice.
                              </p>
                              <p>
                                2. The choice of ensemble size really depdens on
                                why are you using our service. If you are
                                interested in a particular cluster (e.g., You
                                want to search a plan with at least some number
                                of Opportunity Districts), it is sufficient to
                                use small ensembles. However, if you are
                                interested in evaluating some clustering
                                methods, you may want to use larger ensembles.
                              </p>
                              <hr />
                              <p className="mb-0">
                                So, keep those in mind! In the dropdown menu
                                below, you can select an ensemble of your
                                choice.
                              </p>
                            </Alert>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Dropdown drop="end">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                <span>
                                  Selected Ensemble:{" "}
                                  <b>Ensemble #1 (100 Plans)</b>
                                </span>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {exampleEnsembleArr.map((_, i) => {
                                  return (
                                    <Dropdown.Item key={i}>
                                      {"Ensemble " +
                                        (i + 1) +
                                        " (" +
                                        100 * (i + 1) +
                                        " plans)"}
                                    </Dropdown.Item>
                                  );
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
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
