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
  Dropdown,
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
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useRef } from "react";
import { displayablePlans } from "../../assets/makeData";

function PlanScatterPlot({
  setIndex,
  selectedClusterIdx,
  displayedPlans,
  setDisplayedPlans,
}) {
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
    const elementArr = Array.from(getElementAtEvent(chartRef.current, e));

    if (elementArr.length === 0) {
      return;
    }

    const newDisplayedPlans = [
      ...displayedPlans,
      {
        type: "plan",
        id: displayablePlans[Math.floor(Math.random() * 1000)],
        parent: selectedClusterIdx,
      },
    ];

    setDisplayedPlans(newDisplayedPlans);
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

function ClusterScatterPlot({
  setIndex,
  displayedPlans,
  setDisplayedPlans,
  setSelectedClusterIdx,
}) {
  const chartRef = useRef();

  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

  const options = {
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
      datalabels: {
        color: "#36A2EB",
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    animation: false,
  };

  const onClick = (e) => {
    const elementArr = Array.from(getElementAtEvent(chartRef.current, e));
    if (elementArr.length === 0) {
      return;
    }

    const selectedClusterIdx = elementArr[0].index;

    setSelectedClusterIdx(selectedClusterIdx + 1);

    const newDisplayedPlans = [
      ...displayedPlans,
      { type: "cluster", id: selectedClusterIdx + 1, parent: null },
    ];
    setDisplayedPlans(newDisplayedPlans);
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
          plugins={[ChartDataLabels]}
        />
      </Row>
    </Container>
  );
}

export default function ClusterPlotForm({ displayedPlans, setDisplayedPlans }) {
  const [showTabularSummary, setShowTabularSummary] = useState(false);
  const [showAdjustFilter, setShowAdjustFilter] = useState(false);
  const [showChangeViewSettings, setShowChangeViewSettings] = useState(false);
  const [showClusteringMethodEvaluation, setShowClusteringMethodEvaluation] =
    useState(false);

  const [selectedDistanceMeasure, setSelectedDistanceMeasure] =
    useState("optimalTransport"); // optimalTransport, hammingDistance, totalVariationDistance

  const [index, setIndex] = useState(0);

  const [selectedClusterIdx, setSelectedClusterIdx] = useState(0);

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
                            {"Cluster #" + selectedClusterIdx}
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
                      <ClusterScatterPlot
                        setIndex={setIndex}
                        displayedPlans={displayedPlans}
                        setDisplayedPlans={setDisplayedPlans}
                        setSelectedClusterIdx={setSelectedClusterIdx}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <PlanScatterPlot
                        selectedClusterIdx={selectedClusterIdx}
                        displayedPlans={displayedPlans}
                        setDisplayedPlans={setDisplayedPlans}
                      />
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
                <Card.Header>Overview of Clusters</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Table striped bordered hover className="text-center">
                        <tbody>
                          <tr>
                            <td>No. of Clusters</td>
                            <td>
                              <Badge bg="secondary">50</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td>Avg. Cluster Size</td>
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
                                    Throw out the items you don't want to see,
                                    just focus on the ones you want.
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
                                    Display the Cluters and Plans In a Way that
                                    Suits You.
                                  </Alert.Heading>
                                  <p>
                                    Depending how a plan is redistricted, each
                                    can have variety of different
                                    characteristics. (e.g., compactness,
                                    demographics, etc). In order to analyze such
                                    variation, you can display the cluster and
                                    plans with different X-Y axis system.
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
                                    X-axis: <b>No. of Opportunity Districts</b>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                      No. of Opportunity Districts
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
                                    Y-axis:{" "}
                                    <b>Average African-American Proportion</b>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                      Average African-American Proportion
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                      Average Asian Proportion
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Average Hispanic Proportion
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Average White Proportion
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Compactness Index
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
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
                          <Card
                            className="selectable"
                            bg={
                              selectedDistanceMeasure === "optimalTransport"
                                ? "primary"
                                : "light"
                            }
                            text={
                              selectedDistanceMeasure === "optimalTransport"
                                ? "white"
                                : ""
                            }
                            onClick={() =>
                              setSelectedDistanceMeasure("optimalTransport")
                            }
                          >
                            <Card.Body>
                              <Card.Title>Center-Point Distance</Card.Title>
                              <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card
                            className="selectable"
                            bg={
                              selectedDistanceMeasure === "hammingDistance"
                                ? "primary"
                                : "light"
                            }
                            text={
                              selectedDistanceMeasure === "hammingDistance"
                                ? "white"
                                : ""
                            }
                            onClick={() =>
                              setSelectedDistanceMeasure("hammingDistance")
                            }
                          >
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
                          <Card
                            className="selectable"
                            bg={
                              selectedDistanceMeasure ===
                              "totalVariationDistance"
                                ? "primary"
                                : "light"
                            }
                            text={
                              selectedDistanceMeasure ===
                              "totalVariationDistance"
                                ? "white"
                                : ""
                            }
                            onClick={() =>
                              setSelectedDistanceMeasure(
                                "totalVariationDistance"
                              )
                            }
                          >
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
                              size="xl"
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
                                        See if the Ensemble is well-clustered.
                                      </Alert.Heading>
                                      <p>
                                        What defines a 'good clustering'? It can
                                        assessed by both, or either one of the
                                        two criteria:
                                      </p>
                                      <p>
                                        <b>First,</b> Each cluster is
                                        well-defined (meaning that each cluster
                                        is separate from other clusters).
                                      </p>
                                      <p>
                                        <b>Second,</b> Each cluster is 'compact'
                                        (meaning that each cluster is not too
                                        spread out).
                                      </p>
                                      <hr />
                                      <p className="mb-0">
                                        In the table below, you can see the
                                        comparison between each measure and the
                                        optimal transport, the one known to be
                                        the best so far.
                                      </p>
                                    </Alert>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Table
                                      striped
                                      bordered
                                      hover
                                      className="text-center"
                                    >
                                      <thead>
                                        <tr>
                                          <td> </td>
                                          <td colSpan={4}>
                                            Cluster Separation Index
                                          </td>
                                          <td colSpan={4}>
                                            In-Cluster Similarity Index
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Distance Measure</td>
                                          <td>Median</td>
                                          <td>Mean</td>
                                          <td>Max</td>
                                          <td>Min</td>
                                          <td>Median</td>
                                          <td>Mean</td>
                                          <td>Max</td>
                                          <td>Min</td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>Center-Point Distance</td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.9</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.1</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.8</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.98</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>Hamming Distance</td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.9</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.1</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.8</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.98</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Total Variation Distance</td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.9</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.1</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.8</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.98</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              backgroundColor: "yellow",
                                            }}
                                          >
                                            Optimal Transport
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.9</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.1</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.7</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.8</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.98</Badge>
                                          </td>
                                          <td>
                                            <Badge bg="secondary">0.43</Badge>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
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
