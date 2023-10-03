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

export default function ClusterTableForm({
  displayedPlans,
  setDisplayedPlans,
}) {
  const [showSummaryTable, setShowSummaryTable] = useState(false);
  const [showAdjustFilter, setShowAdjustFilter] = useState(false);
  const [showChangeViewSettings, setShowChangeViewSettings] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeClusterIdx, setActiveClusterIdx] = useState(-1);

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
                            {"Cluster #" + activeClusterIdx}
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
                      <TableWrapper
                        setIndex={setIndex}
                        displayedPlans={displayedPlans}
                        setDisplayedPlans={setDisplayedPlans}
                        activeClusterIdx={activeClusterIdx}
                        setActiveClusterIdx={setActiveClusterIdx}
                        pageSize={10}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <TableWrapperPlan
                        displayedPlans={displayedPlans}
                        setDisplayedPlans={setDisplayedPlans}
                        activeClusterIdx={activeClusterIdx}
                        setActiveClusterIdx={setActiveClusterIdx}
                        pageSize={10}
                      />
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
                            <Col>
                              <Breadcrumb>
                                {index === 0 ? (
                                  <Breadcrumb.Item active>
                                    Ensemble #1
                                  </Breadcrumb.Item>
                                ) : (
                                  <>
                                    <Breadcrumb.Item
                                      onClick={() => setIndex(0)}
                                    >
                                      Ensemble #1
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                      {"Cluster #" + activeClusterIdx}
                                    </Breadcrumb.Item>
                                  </>
                                )}
                              </Breadcrumb>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={8}>
                              <Carousel
                                activeIndex={index}
                                onSelect={handleSelect}
                                slide={true}
                                interval={null}
                                controls={false}
                                indicators={false}
                              >
                                <Carousel.Item>
                                  <TableWrapper
                                    setIndex={setIndex}
                                    displayedPlans={displayedPlans}
                                    setDisplayedPlans={setDisplayedPlans}
                                    activeClusterIdx={activeClusterIdx}
                                    setActiveClusterIdx={setActiveClusterIdx}
                                    pageSize={20}
                                  />
                                </Carousel.Item>
                                <Carousel.Item>
                                  <TableWrapperPlan
                                    displayedPlans={displayedPlans}
                                    setDisplayedPlans={setDisplayedPlans}
                                    activeClusterIdx={activeClusterIdx}
                                    setActiveClusterIdx={setActiveClusterIdx}
                                    pageSize={20}
                                  />
                                </Carousel.Item>
                              </Carousel>
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
                                            <Row>
                                              <Col>
                                                <Row>
                                                  <Col>
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
                                                          No. of Opportunity
                                                          Districts
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">
                                                          Cracking Occurences
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">
                                                          Packing Occurences
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">
                                                          Compactness Index
                                                        </Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                  <Col>
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
                                                  </Col>
                                                </Row>
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
                                                No. of Opportunity Districts
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">
                                                Cracking Occurences
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">
                                                Packing Occurences
                                              </Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">
                                                Compactness Index
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
                      Change View Settings...
                    </Button>

                    <Modal
                      show={showAdjustFilter}
                      onHide={handleCloseAdjustFilter}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Change View Settings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <Alert variant="success">
                              <Alert.Heading>
                                Sort It and Find Your Item.
                              </Alert.Heading>
                              <p>
                                It's a burden sorting through all clusters and
                                plans. Use the dropdowns below to sort them.
                              </p>
                            </Alert>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Dropdown>
                              <Dropdown.Toggle
                                size="sm"
                                variant="success"
                                id="dropdown-basic"
                              >
                                Sort By: <b>Vote Margin</b>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                  Vote Margin
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                  No. of Opportunity Districts
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Cracking Occurences
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Packing Occurences
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Compactness Index
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <Dropdown>
                              <Dropdown.Toggle
                                size="sm"
                                variant="success"
                                id="dropdown-basic"
                              >
                                Sort Order: <b>Ascending</b>
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
                      Adjust Filter...
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
                                Filter Out Unwanted Items.
                              </Alert.Heading>
                              <p>
                                Throw out the items you don't want to see, just
                                focus on the ones you want.
                              </p>
                            </Alert>
                          </Col>
                        </Row>
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
                                  No. of Opportunity Districts
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Cracking Occurences
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Packing Occurences
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  Compactness Index
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
