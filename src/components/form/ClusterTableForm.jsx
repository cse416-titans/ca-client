import {
  Container,
  Table,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Breadcrumb,
  Carousel,
  Modal,
  Alert,
  Form,
  Dropdown,
  ListGroup,
} from "react-bootstrap";

import DataForm from "../common/DataForm";
import {
  TableWrapper,
  TableWrapperClusterAndPlan,
  TableWrapperPlan,
} from "./TableExample";

import { useState } from "react";

export default function ClusterTableForm() {
  const [showSummaryTable, setShowSummaryTable] = useState(false);
  const [showAdjustFilter, setShowAdjustFilter] = useState(false);
  const [showChangeViewSettings, setShowChangeViewSettings] = useState(false);
  const [index, setIndex] = useState(0);

  const handleCloseSummaryTable = () => setShowSummaryTable(false);
  const handleShowSummaryTable = () => setShowSummaryTable(true);
  const handleCloseAdjustFilter = () => setShowAdjustFilter(false);
  const handleShowAdjustFilter = () => setShowAdjustFilter(true);
  const handleCloseChangeViewSettings = () => setShowChangeViewSettings(false);
  const handleShowChangeViewSettings = () => setShowChangeViewSettings(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <DataForm headerText={"ClusterTableForm"}>
      <Row className="mb-3">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Row>
                <Col className="align-middle">
                  <Stack direction="horizontal" gap={3}>
                    <span>Summary Table of </span>
                    <Breadcrumb>
                      {index === 0 ? (
                        <Breadcrumb.Item active>Ensemble #1</Breadcrumb.Item>
                      ) : (
                        <>
                          <Breadcrumb.Item onClick={() => setIndex(0)}>
                            Ensemble #1
                          </Breadcrumb.Item>
                          <Breadcrumb.Item active>
                            {"Cluster #" + Math.floor(Math.random() * 50)}
                          </Breadcrumb.Item>
                        </>
                      )}
                    </Breadcrumb>
                  </Stack>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <Row>
                <Col>
                  <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    slide={true}
                    interval={null}
                    controls={false}
                    indicators={false}
                  >
                    <Carousel.Item>
                      <TableWrapper setIndex={setIndex} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <TableWrapperPlan />
                    </Carousel.Item>
                  </Carousel>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Stack direction="horizontal" gap={0}>
                    <>
                      <Button
                        className="mb-3 mx-3"
                        variant="outline-success"
                        size="sm"
                        onClick={handleShowSummaryTable}
                      >
                        View In Detail...
                      </Button>

                      <Modal
                        show={showSummaryTable}
                        size="xl"
                        onHide={handleCloseSummaryTable}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Tabular Summary of Ensemble #1
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            <Col md={8}>
                              <TableWrapperClusterAndPlan />
                            </Col>
                            <Col>
                              <Row>
                                <Col>
                                  <Card>
                                    <Card.Header>
                                      Change View Settings
                                    </Card.Header>
                                    <Card.Body>
                                      <Row>
                                        <Col>
                                          <Form>
                                            <Row className="mb-3">
                                              <Col>
                                                <ListGroup>
                                                  <ListGroup.Item>
                                                    Plan / Cluster Display
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    <Form.Check
                                                      onClick={(e) =>
                                                        alert(e.target.name)
                                                      }
                                                      type={"radio"}
                                                      name="viewclusterplan"
                                                      label={`Clusters Only`}
                                                    />
                                                    <Form.Check
                                                      type={"radio"}
                                                      name="viewclusterplan"
                                                      label={`Plans Only`}
                                                    />
                                                    <Form.Check
                                                      type={"radio"}
                                                      name="viewclusterplan"
                                                      label={`Clusters and Plans`}
                                                    />
                                                  </ListGroup.Item>
                                                </ListGroup>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <ListGroup>
                                                  <ListGroup.Item>
                                                    Sort By...
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    <Dropdown>
                                                      <Dropdown.Toggle
                                                        size="sm"
                                                        variant="success"
                                                        id="dropdown-basic"
                                                      >
                                                        Sort By:{" "}
                                                        <b>Vote Margin</b>
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">
                                                          Vote Margin
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">
                                                          Democratic Seats
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">
                                                          Republican Seats
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">
                                                          Maj-Min Demographic
                                                          Ratio
                                                        </Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    <Dropdown>
                                                      <Dropdown.Toggle
                                                        size="sm"
                                                        variant="success"
                                                        id="dropdown-basic"
                                                      >
                                                        Sort Order:{" "}
                                                        <b>Ascending</b>
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">
                                                          Ascending
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">
                                                          Descending
                                                        </Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  </ListGroup.Item>
                                                </ListGroup>
                                              </Col>
                                            </Row>
                                          </Form>
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col>
                                  <Card>
                                    <Card.Header>Filter By...</Card.Header>
                                    <Card.Body>
                                      <Row>
                                        <Col>
                                          <Dropdown>
                                            <Dropdown.Toggle
                                              size="sm"
                                              variant="success"
                                              id="dropdown-basic"
                                            >
                                              Filter By: <b>Vote Margin</b>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                              <Dropdown.Item href="#/action-1">
                                                Vote Margin
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-2">
                                                Democratic Seats
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">
                                                Republican Seats
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">
                                                Maj-Min Demographic Ratio
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </Col>
                                      </Row>
                                      <Row className="mt-3">
                                        <Col>
                                          <>
                                            <Form.Label>Min</Form.Label>
                                            <Form.Range />
                                          </>
                                        </Col>
                                        <Col>
                                          <>
                                            <Form.Label>Max</Form.Label>
                                            <Form.Range />
                                          </>
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleCloseSummaryTable}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
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
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={handleShowAdjustFilter}
                    >
                      Adjust Filter...
                    </Button>

                    <Modal
                      show={showAdjustFilter}
                      onHide={handleCloseAdjustFilter}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Adjust Filter</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <Alert variant="success">
                              <Alert.Heading>
                                Hey, nice to see you
                              </Alert.Heading>
                              <p>
                                Aww yeah, you successfully read this important
                                alert message. This example text is going to run
                                a bit longer so that you can see how spacing
                                within an alert works with this kind of content.
                              </p>
                              <hr />
                              <p className="mb-0">
                                Whenever you need to, be sure to use margin
                                utilities to keep things nice and tidy.
                              </p>
                            </Alert>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseAdjustFilter}
                        >
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleCloseAdjustFilter}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={handleShowChangeViewSettings}
                    >
                      Change View Settings...
                    </Button>

                    <Modal
                      show={showChangeViewSettings}
                      onHide={handleCloseChangeViewSettings}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Change View Settings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <Alert variant="success">
                              <Alert.Heading>
                                Hey, nice to see you
                              </Alert.Heading>
                              <p>
                                Aww yeah, you successfully read this important
                                alert message. This example text is going to run
                                a bit longer so that you can see how spacing
                                within an alert works with this kind of content.
                              </p>
                              <hr />
                              <p className="mb-0">
                                Whenever you need to, be sure to use margin
                                utilities to keep things nice and tidy.
                              </p>
                            </Alert>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseChangeViewSettings}
                        >
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleCloseChangeViewSettings}
                        >
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
        <Col>
          <Card border="info">
            <Card.Header>Voting Estimation</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <span>
                    In this Ensemble, see how the voting margins for each
                    cluster is calculated.
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
