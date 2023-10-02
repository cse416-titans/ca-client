import { useState } from "react";

import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Badge,
  Table,
  Form,
  Carousel,
  Stack,
  Modal,
  Alert,
} from "react-bootstrap";

import { data, dataPlan } from "../../assets/testData";
import DataForm from "../common/DataForm";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Zoom from "chartjs-plugin-zoom";

import { useRef } from "react";

function PlanScatterPlot({ setIndex }) {
  const chartRef = useRef();
  ChartJS.register(
    zoomPlugin,
    Zoom,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
    },
    animation: false,
    zoom: {
      zoom: {
        wheel: {
          enabled: true, // SET SCROOL ZOOM TO TRUE
        },
        mode: "xy",
        speed: 100,
      },
      pan: {
        enabled: true,
        mode: "xy",
        speed: 100,
      },
    },
  };

  const onClick = (e) => {
    if (Array.from(getElementAtEvent(chartRef.current, e)).length === 0) {
      return;
    }
    setIndex(1);
  };

  return (
    <Container className="justify-content-center">
      <Row
        style={{ width: "700px", height: "300px", justifyContent: "center" }}
      >
        <Chart
          ref={chartRef}
          type="scatter"
          options={options}
          data={dataPlan}
          onClick={onClick}
        />
      </Row>
    </Container>
  );
}

function ClusterScatterPlot({ setIndex }) {
  const chartRef = useRef();

  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

  const options = {
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
    },
    animation: false,
  };

  const onClick = (e) => {
    if (Array.from(getElementAtEvent(chartRef.current, e)).length === 0) {
      return;
    }
    setIndex(1);
  };

  return (
    <Container className="justify-content-center">
      <Row
        style={{ width: "700px", height: "300px", justifyContent: "center" }}
      >
        <Chart
          ref={chartRef}
          type="scatter"
          options={options}
          data={data}
          onClick={onClick}
        />
      </Row>
    </Container>
  );
}

export default function ClusterPlotForm() {
  const [showTabularSummary, setShowTabularSummary] = useState(false);
  const [showAdjustFilter, setShowAdjustFilter] = useState(false);
  const [showChangeViewSettings, setShowChangeViewSettings] = useState(false);
  const [showClusteringMethodEvaluation, setShowClusteringMethodEvaluation] =
    useState(false);

  const [index, setIndex] = useState(0);

  const handleCloseTabularSummary = () => setShowTabularSummary(false);
  const handleShowTabularSummary = () => setShowTabularSummary(true);
  const handleCloseAdjustFilter = () => setShowAdjustFilter(false);
  const handleShowAdjustFilter = () => setShowAdjustFilter(true);
  const handleCloseChangeViewSettings = () => setShowChangeViewSettings(false);
  const handleShowChangeViewSettings = () => setShowChangeViewSettings(true);
  const handleCloseClusteringMethodEvaluation = () =>
    setShowClusteringMethodEvaluation(false);
  const handleShowClusteringMethodEvaluation = () =>
    setShowClusteringMethodEvaluation(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <DataForm headerText={"ClusterPlotForm"}>
      <Tabs
        defaultActiveKey="cluster"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="cluster" title="Clusters Overview">
          <Row className="mb-3 align-middle">
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Stack direction="horizontal" gap={3}>
                    <span>Scatter Plot of </span>
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
                </Card.Header>
                <Card.Body>
                  <Carousel
                    data-bs-theme="dark"
                    activeIndex={index}
                    onSelect={handleSelect}
                    slide={true}
                    interval={null}
                    controls={false}
                    indicators={false}
                  >
                    <Carousel.Item>
                      <ClusterScatterPlot setIndex={setIndex} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <PlanScatterPlot />
                    </Carousel.Item>
                  </Carousel>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}></Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <Card>
                <Card.Header>View Tabular Summary</Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col>
                      <>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={handleShowTabularSummary}
                        >
                          Open In New Window...
                        </Button>

                        <Modal
                          show={showTabularSummary}
                          onHide={handleCloseTabularSummary}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Select an Ensemble</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Row>
                              <Col>
                                <Alert variant="success">
                                  <Alert.Heading>
                                    Hey, nice to see you
                                  </Alert.Heading>
                                  <p>
                                    Aww yeah, you successfully read this
                                    important alert message. This example text
                                    is going to run a bit longer so that you can
                                    see how spacing within an alert works with
                                    this kind of content.
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
                              onClick={handleCloseTabularSummary}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleCloseTabularSummary}
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
            <Col lg={6}>
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
                                    Aww yeah, you successfully read this
                                    important alert message. This example text
                                    is going to run a bit longer so that you can
                                    see how spacing within an alert works with
                                    this kind of content.
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
                                    Aww yeah, you successfully read this
                                    important alert message. This example text
                                    is going to run a bit longer so that you can
                                    see how spacing within an alert works with
                                    this kind of content.
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
          </Row>
        </Tab>
        <Tab eventKey="plan" title="Clustering Method">
          <Row>
            <Col lg={12} className="mb-3">
              <Row>
                <Col>
                  <Card>
                    <Card.Header className="align-middle">
                      <Row>
                        <Col>Change Distance Measure</Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Row className="gy-4">
                        <Col md={6}>
                          <Card bg="primary" text="white">
                            <Card.Body>
                              <Card.Title>Optimal Transport</Card.Title>
                              <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <Card.Body>
                              <Card.Title>Hamming Distance</Card.Title>
                              <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <Card.Body>
                              <Card.Title>Total Variation Distance</Card.Title>
                              <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row>
                <Col>
                  <Card>
                    <Card.Header className="align-middle">
                      <Row>
                        <Col>Adjust Cluster Size</Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <>
                            <Form.Label>Minimum</Form.Label>
                            <Form.Range />
                          </>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <>
                            <Form.Label>Maximum</Form.Label>
                            <Form.Range />
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
            </Col>
            <Col lg={6}>
              <Row>
                <Col>
                  <Card>
                    <Card.Header className="align-middle">
                      <Row>
                        <Col>Clustering Method Evaluation</Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Table striped bordered hover>
                            <tbody>
                              <tr className="text-center">
                                <td colSpan={2}>
                                  <b>Optimal Transport</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Mean Cluster Distance</td>
                                <td>
                                  <Badge bg="secondary">0.8</Badge>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={handleShowClusteringMethodEvaluation}
                            >
                              View In Detail...
                            </Button>

                            <Modal
                              show={showClusteringMethodEvaluation}
                              onHide={handleCloseClusteringMethodEvaluation}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Evaluate Your Clustering Method
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Row>
                                  <Col>
                                    <Alert variant="success">
                                      <Alert.Heading>
                                        Hey, nice to see you
                                      </Alert.Heading>
                                      <p>
                                        Aww yeah, you successfully read this
                                        important alert message. This example
                                        text is going to run a bit longer so
                                        that you can see how spacing within an
                                        alert works with this kind of content.
                                      </p>
                                      <hr />
                                      <p className="mb-0">
                                        Whenever you need to, be sure to use
                                        margin utilities to keep things nice and
                                        tidy.
                                      </p>
                                    </Alert>
                                  </Col>
                                </Row>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={
                                    handleCloseClusteringMethodEvaluation
                                  }
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={
                                    handleCloseClusteringMethodEvaluation
                                  }
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </DataForm>
  );
}
