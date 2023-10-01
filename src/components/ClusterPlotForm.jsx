import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
} from "react-bootstrap";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Chart, getElementAtEvent } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useRef, useEffect } from "react";

import DataForm from "./common/DataForm";
import DescriptedClickable from "./common/DescriptedClickable";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  animation: false,
  plugins: {
    tooltip: {
      filter: function (tooltipItem) {
        return tooltipItem.datasetIndex === 0;
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dynamicColors = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 0.1 + Math.random() * 0.5;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

export const data = {
  labels: labels,
  datasets: [
    {
      type: "bubble",
      label: "Cluster",
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
        r: faker.number.int({ min: 15, max: 25 }),
      })),
      backgroundColor: Array.from({ length: 50 }, () => dynamicColors()),
    },
    {
      type: "scatter",
      label: "District Plan",
      data: Array.from({ length: 5000 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
      })),
      pointRadius: 0.5,
      pointHoverRadius: 0.5,
      pointHitRadius: 0,
      backgroundColor: "rgba(0,0,0,0.1)",
      //point cross
    },
  ],
};

export const options2 = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  animation: false,
  plugins: {
    tooltip: {
      filter: function (tooltipItem) {
        return tooltipItem.datasetIndex === 0;
      },
    },
  },
};

const labels2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const dynamicColors2 = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 0.1 + Math.random() * 0.5;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

export const data2 = {
  labels: labels2,
  datasets: [
    {
      type: "scatter",
      label: "District Plan",
      data: Array.from({ length: 1000 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      })),
      pointRadius: 3,
      backgroundColor: Array.from({ length: 1000 }, () => dynamicColors2()),
      //point cross
    },
  ],
};

function ClusterScatterPlot() {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <BubbleChart />
        </Col>
        <Col xs={6}>
          <Row>
            <DescriptedClickable headerText={"Distance Measure"}>
              <Row>
                <Col xs={6}>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Distance Measure 1
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Distance Measure 1</Dropdown.Item>
                      <Dropdown.Item>Distance Measure 2</Dropdown.Item>
                      <Dropdown.Item>Distance Measure 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={6}>
                  <Button>Compare This Measure...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Display selected cluster"}>
              <Row>
                <Col>
                  <Button>Display cluster #1...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Plotting criteria"}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      X: ~
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>A</Dropdown.Item>
                      <Dropdown.Item>B</Dropdown.Item>
                      <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Y: ~
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>D</Dropdown.Item>
                      <Dropdown.Item>E</Dropdown.Item>
                      <Dropdown.Item>F</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Filter"}>
              <Row>
                <Col>
                  <Button>Filter...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function PlanScatterPlot() {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <BubbleChartPlan />
        </Col>
        <Col xs={6}>
          <Row>
            <DescriptedClickable headerText={"Distance Measure"}>
              <Row>
                <Col xs={6}>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Distance Measure 1
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Distance Measure 1</Dropdown.Item>
                      <Dropdown.Item>Distance Measure 2</Dropdown.Item>
                      <Dropdown.Item>Distance Measure 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={6}>
                  <Button>Compare This Measure...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Display selected cluster"}>
              <Row>
                <Col>
                  <Button>Display cluster #1...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Plotting criteria"}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      X: ~
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>A</Dropdown.Item>
                      <Dropdown.Item>B</Dropdown.Item>
                      <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Y: ~
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>D</Dropdown.Item>
                      <Dropdown.Item>E</Dropdown.Item>
                      <Dropdown.Item>F</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
          <Row>
            <DescriptedClickable headerText={"Filter"}>
              <Row>
                <Col>
                  <Button>Filter...</Button>
                </Col>
              </Row>
            </DescriptedClickable>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function BubbleChartPlan() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
  }, []);

  return (
    <Chart
      type="bubble"
      ref={chartRef}
      onClick={(e) => {
        console.log(getElementAtEvent(chartRef.current, e));
      }}
      options={options2}
      data={data2}
    />
  );
}

function BubbleChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
  }, []);

  return (
    <Chart
      type="bubble"
      ref={chartRef}
      onClick={(e) => {
        console.log(getElementAtEvent(chartRef.current, e));
      }}
      options={options}
      data={data}
    />
  );
}

export default function ClusterPlotForm() {
  return (
    <DataForm headerText={"ClusterPlotForm"}>
      <Tabs
        defaultActiveKey="cluster"
        id="uncontrolled-tab-example"
        className="mb-0"
      >
        <Tab eventKey="cluster" title="Cluster">
          <ClusterScatterPlot />
        </Tab>
        <Tab eventKey="plan" title="Plan">
          <PlanScatterPlot />
        </Tab>
      </Tabs>
    </DataForm>
  );
}
