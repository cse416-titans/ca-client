import { Row, Col, Tooltip, Card, Button, Badge, Table } from "react-bootstrap";

import DataForm from "../common/DataForm";

/*
 * Placeholder for basic info about the set of ensembles that user selected
 * Info includes: 1) total number of random district plans (number), 2) average distance between distance plan pairs (number)
 * Option includes: 1) ensemble selection dropdown menu
 */

export default function StateInfoForm({
  selectedState,
  setSelectedState,
  setshowCurrentDistrictPlan,
}) {
  return (
    <DataForm headerText={"EnsembleInfoForm"}>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Select a State to Analyze</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card
                    bg={selectedState === "AZ" ? "primary" : "light"}
                    text={selectedState === "AZ" ? "white" : ""}
                    className="selectable"
                    onClick={() => {
                      setSelectedState("AZ");
                      setshowCurrentDistrictPlan(true);
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Arizona</Card.Title>
                      <Card.Subtitle>State Assembly Plan</Card.Subtitle>
                      <Card.Text>
                        <Row className="mt-3">
                          <Col>
                            <Table
                              striped
                              bordered
                              hover
                              className="text-center"
                            >
                              <tbody>
                                <tr>
                                  <td>Enacted</td>
                                  <td>
                                    <Badge bg="secondary">2021</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">17</Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              variant={
                                selectedState === "AZ"
                                  ? "outline-light"
                                  : "outline-primary"
                              }
                              size="sm"
                            >
                              Detail..
                            </Button>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card
                    bg={selectedState === "LA" ? "primary" : "light"}
                    text={selectedState === "LA" ? "white" : ""}
                    className="selectable"
                    onClick={() => {
                      setSelectedState("LA");
                      setshowCurrentDistrictPlan(true);
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Louisianna</Card.Title>
                      <Card.Subtitle>State Assembly Plan</Card.Subtitle>
                      <Card.Text>
                        <Row className="mt-3">
                          <Col>
                            <Table
                              striped
                              bordered
                              hover
                              className="text-center"
                            >
                              <tbody>
                                <tr>
                                  <td>Enacted</td>
                                  <td>
                                    <Badge bg="secondary">2021</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">17</Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              variant={
                                selectedState === "LA"
                                  ? "outline-light"
                                  : "outline-primary"
                              }
                              size="sm"
                            >
                              Detail..
                            </Button>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card
                    bg={selectedState === "NV" ? "primary" : "light"}
                    text={selectedState === "NV" ? "white" : ""}
                    className="selectable"
                    onClick={() => {
                      setSelectedState("NV");
                      setshowCurrentDistrictPlan(true);
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Nevada</Card.Title>
                      <Card.Subtitle>State Assembly Plan</Card.Subtitle>
                      <Card.Text>
                        <Row className="mt-3">
                          <Col>
                            <Table
                              striped
                              bordered
                              hover
                              className="text-center"
                            >
                              <tbody>
                                <tr>
                                  <td>Enacted</td>
                                  <td>
                                    <Badge bg="secondary">2021</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">17</Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              variant={
                                selectedState === "NV"
                                  ? "outline-light"
                                  : "outline-primary"
                              }
                              size="sm"
                            >
                              Detail..
                            </Button>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3 text-end">
                <Col>
                  <span style={{ fontStyle: "italic" }}>
                    ... And More to Come!
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card border="info">
            <Card.Header>How to Use</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <span>
                    Take a look at the instructions on how to use this tool.
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-info" size="sm">
                    See How...
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
