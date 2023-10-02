import { Row, Col, Tooltip, Card, Button, Badge, Table } from "react-bootstrap";

import DataForm from "../common/DataForm";

import { useState } from "react";


// json
import arizona from "../../data/arizona_curr.json";
import louisiana from "../../data/louisiana_curr.json";
import nevada from "../../data/nevada_curr.json";
import { useEffect } from "react";


/*
 * Placeholder for basic info about the set of ensembles that user selected
 * Info includes: 1) total number of random district plans (number), 2) average distance between distance plan pairs (number)
 * Option includes: 1) ensemble selection dropdown menu
 */


export default function StateInfoForm({ map_f, setMap_f }) {
  const [selectedState, setSelectedState] = useState("Arizona");

  useEffect(() => {
    if (selectedState === "Arizona") {
      setMap_f([[34.048927, -111.093735], 7, arizona])
      console.log("Ar_Here");
    }
    else if (selectedState === "Louisiana") {
      setMap_f([[30.391830, -92.329102], 7, louisiana])
    }
    else if (selectedState === "Nevada") {
      setMap_f([[39.876019, -117.224121], 7, nevada])
    }

  }, [selectedState])

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
                    bg={selectedState === "Arizona" ? "primary" : "light"}
                    text={selectedState === "Arizona" ? "white" : ""}
                    className="selectable"
                    onClick={() => setSelectedState("Arizona")}
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
                                selectedState === "Arizona"
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
                    bg={selectedState === "Louisianna" ? "primary" : "light"}
                    text={selectedState === "Louisianna" ? "white" : ""}
                    className="selectable"
                    onClick={() => setSelectedState("Louisiana")}
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
                                selectedState === "Louisiana"
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
                    bg={selectedState === "Nevada" ? "primary" : "light"}
                    text={selectedState === "Nevada" ? "white" : ""}
                    className="selectable"
                    onClick={() => setSelectedState("Nevada")}
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
                                selectedState === "Nevada"
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
