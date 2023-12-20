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

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
  Bar,
  Rectangle,
  BarChart,
} from "recharts";

import { useState } from "react";
import { convertToStringSplitFromArrays } from "../../utils/StringFormat";

export default function ClusterTableForm({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  clusterSetAnalysis,
  setClusterSetAnalysis,
  clusterAnalysis,
  setClusterAnalysis,
  setIsLoading,
  currentlyEnactedPlan,
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

  if (clusterAnalysis === null) {
    return <div>ERROR: NO_CLUSTER_SELECTED</div>;
  }

  if (!currentlyEnactedPlan) {
    return <div>ERROR: NO_STATE_SELECTED</div>;
  }

  console.log("currentlyEnactedPlan");
  console.log(currentlyEnactedPlan);

  console.log("clusterAnalysis");
  console.log(clusterAnalysis);

  const numOfDistricts = clusterAnalysis[0]["aAPercentages"].length;
  const numOfClusters = clusterAnalysis.length;

  console.log("numOfDistricts");
  console.log(numOfDistricts);

  const voteSplitData = [];
  const districtData = [];

  for (let i = 0; i < numOfClusters; i++) {
    voteSplitData.push({
      democraticSplit: clusterAnalysis[i]["democraticSplit"].length,
      republicanSplit: clusterAnalysis[i]["republicanSplit"].length,
    });
  }

  Array.from(clusterAnalysis).forEach((plan) => {
    districtData.push({
      name: `${plan["name"]}`,
      numOfMajMinDistricts: plan["numOfMajMinDistricts"],
      numOfCompetitiveDistricts: plan["numOfCompetitiveDistricts"],
      numOfAAOpp: plan["numOfAAOpp"],
      numOfHispanicOpp: plan["numOfHispanicOpp"],
      numOfAsianOpp: plan["numOfAsianOpp"],
    });
  });

  console.log("districtData");
  console.log(districtData);

  const voteSplitFreq = [];

  for (let i = 0; i <= numOfDistricts; i++) {
    voteSplitFreq.push({
      name: `${i}/${numOfDistricts - i}`,
      freq: 0,
    });
  }

  for (let i = 0; i < voteSplitData.length; i++) {
    voteSplitFreq[voteSplitData[i]["democraticSplit"]]["freq"] += 1;
  }

  console.log("voteSplitFreq");
  console.log(voteSplitFreq);

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
                        selectedState={selectedState}
                        selectedEnsemble={selectedEnsemble}
                        selectedDistanceMeasure={selectedDistanceMeasure}
                        activeClusterIdx={activeClusterIdx}
                        setActiveClusterIdx={setActiveClusterIdx}
                        clusterSetAnalysis={clusterSetAnalysis}
                        setClusterAnalysis={setClusterAnalysis}
                        pageSize={10}
                        setIsLoading={setIsLoading}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <TableWrapperPlan
                        displayedPlans={displayedPlans}
                        setDisplayedPlans={setDisplayedPlans}
                        selectedState={selectedState}
                        selectedEnsemble={selectedEnsemble}
                        selectedDistanceMeasure={selectedDistanceMeasure}
                        activeClusterIdx={activeClusterIdx}
                        setActiveClusterIdx={setActiveClusterIdx}
                        clusterAnalysis={clusterAnalysis}
                        pageSize={10}
                        setIsLoading={setIsLoading}
                      />
                    </Carousel.Item>
                  </Carousel>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Stack direction="horizontal" gap={0}>
                    <>
                      {index == 1 ? (
                        <Button
                          className="mb-3 mx-3"
                          variant="outline-success"
                          size="sm"
                          onClick={handleShowSummaryTable}
                        >
                          View Cluster Chart...
                        </Button>
                      ) : null}

                      <Modal
                        show={showSummaryTable}
                        size="xl"
                        onHide={handleCloseSummaryTable}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Cluster Summary Chart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            <Col>
                              <h5>R/D Vote Split Frequency</h5>
                              <BarChart
                                width={500}
                                height={300}
                                data={voteSplitFreq}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                  dataKey="freq"
                                  label={{ position: "top" }}
                                  fill="#8884d8"
                                  activeBar={
                                    <Rectangle fill="pink" stroke="blue" />
                                  }
                                />
                              </BarChart>
                            </Col>
                            <Col>
                              <h5>District Composition By Plan</h5>
                              <BarChart
                                width={500}
                                height={300}
                                data={districtData}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                  dataKey="numOfMajMinDistricts"
                                  stackId="a"
                                  fill="#8884d8"
                                />
                                <Bar
                                  dataKey="numOfCompetitiveDistricts"
                                  stackId="a"
                                  fill="#82ca9d"
                                />
                                <Bar
                                  dataKey="numOfAAOpp"
                                  stackId="a"
                                  fill="purple"
                                />
                                <Bar
                                  dataKey="numOfAsianOpp"
                                  stackId="a"
                                  fill="green"
                                />
                                <Bar
                                  dataKey="numOfHispanicOpp"
                                  stackId="a"
                                  fill="blue"
                                />
                              </BarChart>
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
            <Card.Header>
              <Row>
                <Col className="align-middle">Measures for Enacted Plan</Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <Row>
                <Col>
                  <Table striped bordered hover className="text-center mb-0">
                    <thead>
                      <tr>
                        <td>R-D Split</td>
                        <td>Asian</td>
                        <td>A-A</td>
                        <td>Hispanic</td>
                        <td>MajMin</td>
                        <td>Compet.</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {convertToStringSplitFromArrays(
                            currentlyEnactedPlan["republicanSplit"],
                            currentlyEnactedPlan["democraticSplit"]
                          )}
                        </td>
                        <td>{currentlyEnactedPlan["numOfAsianOpp"]}</td>
                        <td>{currentlyEnactedPlan["numOfAAOpp"]}</td>
                        <td>{currentlyEnactedPlan["numOfHispanicOpp"]}</td>
                        <td>{currentlyEnactedPlan["numOfMajMinDistricts"]}</td>
                        <td>
                          {currentlyEnactedPlan["numOfCompetitiveDistricts"]}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
