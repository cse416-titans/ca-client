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
} from "react-bootstrap";

import { data } from "../../assets/testData";
import DataForm from "../common/DataForm";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, getElementAtEvent, getDatasetAtEvent } from "react-chartjs-2";

import { useRef } from "react";

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
          type="bubble"
          options={options}
          data={data}
          onClick={onClick}
        />
      </Row>
    </Container>
  );
}

export default function ClusterPlotForm() {
  const [index, setIndex] = useState(0);

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
                      <ClusterScatterPlot />
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
                      <Button variant="outline-success" size="sm">
                        Open in New Window...
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
            <Col lg={6}>
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
                          <Button variant="outline-success" size="sm">
                            See in Detail...
                          </Button>
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
