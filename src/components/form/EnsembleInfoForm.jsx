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
  Form,
} from "react-bootstrap";

import DataForm from "../common/DataForm";

import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { useEffect, useState } from "react";
import { exampleEnsembleArr } from "../../assets/makeData";
import {
  formatEnsembleId,
  formatGetAssociationAnalysisUrl,
  formatGetDistanceMeasureComparisonUrl,
  formatGetEnsembleAnalysisUrl,
  formatGetStateAnalysisUrl,
  formatThousands,
  makeDistanceMeasureName,
} from "../../../util/FormatUtil";
import api from "../../../api/client";
import { toFixed2 } from "../../utils/StringFormat";
import { DMComparison } from "../clustering-pane/DMComparison";

/*
 * Placeholder for basic info about the set of ensembles that user selected
 * Info includes: 1) total number of random district plans (number), 2) average distance between distance plan pairs (number)
 * Option includes: 1) ensemble selection dropdown menu
 */

function EnsembleAssociationGraph({ data, selectedState }) {
  let dataArr = {};
  let keys = [...Object.keys({ ...data } || {})];
  let sizeArr = [250, 1000, 5000];
  const ensembleSummary = [...Object.values({ ...data } || {})];

  for (let i = 0; i < ensembleSummary.length; i++) {
    ensembleSummary[i]["size"] = sizeArr[i];
  }

  let i = 0;
  ensembleSummary.forEach((row) => {
    let entry = {};
    Object.keys(row).forEach((key) => {
      switch (key) {
        case "clusterSet-1":
          entry["Hamming"] = row[key];
          break;
        case "clusterSet-2":
          entry["Entropy"] = row[key];
          break;
        case "clusterSet-3":
          entry["Optimal Transport"] = row[key];
          break;
        default:
          break;
      }
    });
    dataArr[keys[i]] = entry;
    i++;
  });

  let feedOrdered = [];

  keys.sort().forEach((key) => {
    feedOrdered.push(dataArr[key]);
  });

  feedOrdered.forEach((row) => {
    row["size"] = sizeArr[feedOrdered.indexOf(row)];
  });

  console.log(feedOrdered);

  /*
  100 5
  500  11
  1000 15
  1500 19
  2000 20
  2500 23
  3000 24
  3500 29
  4000 30
  4500 31
  5000 31 
  */

  let clusterData = [];

  switch (selectedState) {
    case "AZ":
      clusterData = [
        { x: 250, y: 5 },
        { x: 500, y: 11 },
        { x: 1000, y: 15 },
        { x: 1500, y: 19 },
        { x: 2000, y: 20 },
        { x: 2500, y: 23 },
        { x: 3000, y: 24 },
        { x: 3500, y: 29 },
        { x: 4000, y: 30 },
        { x: 4500, y: 31 },
        { x: 5000, y: 31 },
      ];
      break;
    case "LA":
      clusterData = [
        { x: 250, y: 9 },
        { x: 500, y: 11 },
        { x: 1000, y: 18 },
        { x: 1500, y: 19 },
        { x: 2000, y: 20 },
        { x: 2500, y: 23 },
        { x: 3000, y: 30 },
        { x: 3500, y: 35 },
        { x: 4000, y: 38 },
        { x: 4500, y: 40 },
        { x: 5000, y: 40 },
      ];
      break;
    case "NV":
      clusterData = [
        { x: 250, y: 9 },
        { x: 500, y: 11 },
        { x: 1000, y: 18 },
        { x: 1500, y: 19 },
        { x: 2000, y: 20 },
        { x: 2500, y: 23 },
        { x: 3000, y: 30 },
        { x: 3500, y: 35 },
        { x: 4000, y: 38 },
        { x: 4500, y: 40 },
        { x: 5000, y: 40 },
      ];
      break;

    default:
      break;
  }

  return (
    <Row>
      <Col>
        <LineChart width={750} height={400} data={clusterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x">
            <Label dy={10}>Number of Plans</Label>
          </XAxis>
          <YAxis>
            <Label angle={270}>Num. of Clusters</Label>
          </YAxis>
          <Tooltip />
          <Line
            label={{ position: "bottom" }}
            type="monotone"
            connectNulls
            dataKey="y"
            stroke="red"
          />
        </LineChart>
      </Col>
    </Row>
  );
}

export default function EnsembleInfoForm({
  selectedState,
  selectedEnsemble,
  setselectedEnsemble,
  selectedDistanceMeasure,
  setSelectedDistanceMeasure,
  setIsLoading,
}) {
  const [associationSummary, setAssociationSummary] = useState(null);
  const [stateAnalysis, setStateAnalysis] = useState(null);
  const [distanceMeasureComparison, setDistanceMeasureComparison] =
    useState(null);

  const [show, setShow] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showDMEvaluation, setShowDMEvaluation] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowGraph = () => setShowGraph(true);
  const handleCloseGraph = () => setShowGraph(false);

  const handleSShowDMEvaluation = () => setShowDMEvaluation(true);
  const handleSCloseDMEvaluation = () => setShowDMEvaluation(false);

  useEffect(() => {
    console.log("selectedState changed");

    const url = formatGetAssociationAnalysisUrl(selectedState);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setAssociationSummary(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedState, setIsLoading]);

  useEffect(() => {
    const url = formatGetStateAnalysisUrl(selectedState);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setStateAnalysis(data);
        console.log("stateAnalysis");
        console.log(data);
      })
      .finally(() => setIsLoading(false));
  }, [selectedState, setIsLoading]);

  useEffect(() => {
    const url = formatGetDistanceMeasureComparisonUrl(
      formatEnsembleId(selectedState, selectedEnsemble)
    );

    console.log(url);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setDistanceMeasureComparison(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedEnsemble, selectedState, setIsLoading]);

  const keys = [...Object.keys(associationSummary || {})];
  const numOfEnsembles = keys.length;
  const ensembleSummary = [...Object.values(associationSummary || {})];

  if (!associationSummary) {
    return <div>ERROR: NO_STATE_SELECTED</div>;
  }

  if (numOfEnsembles === 0) {
    return <div>ERROR: NO_STATE_SELECTED</div>;
  }

  if (!stateAnalysis) {
    return <div>ERROR: NO_STATE_SELECTED</div>;
  }

  console.log("stateAnalysis");
  console.log(stateAnalysis);

  return (
    <DataForm headerText={"EnsembleInfoForm"}>
      <Row className="mb-3">
        <Col lg={12}>
          <Card>
            <Card.Header>Ensemble Selection</Card.Header>

            <Card.Body>
              {stateAnalysis
                ? Array.from(Object.keys(stateAnalysis))
                    .sort()
                    .map((key, i) => {
                      return (
                        <>
                          <h5 key={i}>
                            {formatThousands(
                              stateAnalysis[key]["numOfPlans"] /
                                stateAnalysis[key]["numOfClusterSets"]
                            )}{" "}
                            Plans
                          </h5>
                          <Table striped bordered hover className="text-center">
                            <thead>
                              <td>Distance Measure</td>
                              <td>Avg. Plan Distance</td>
                              <td>Num. of Clusters</td>
                              <td>Avg. Cluster Size</td>
                              <td>Select</td>
                            </thead>
                            <tbody>
                              {Object.keys(stateAnalysis[key]).map(
                                (key2, j) => {
                                  if (
                                    key2 === "numOfPlans" ||
                                    key2 === "numOfClusterSets" ||
                                    key2 === "name" ||
                                    key2 === "id" ||
                                    key2 === "clusterSetIds"
                                  ) {
                                    return null;
                                  }

                                  return (
                                    <tr key={j}>
                                      <td>{makeDistanceMeasureName(j - 4)}</td>
                                      <td>
                                        <Badge bg="secondary">
                                          {toFixed2(
                                            stateAnalysis[key][key2][
                                              "avgPlanDistance"
                                            ]
                                          )}
                                        </Badge>
                                      </td>
                                      <td>
                                        <Badge bg="secondary">
                                          {
                                            stateAnalysis[key][key2][
                                              "numOfClusters"
                                            ]
                                          }
                                        </Badge>
                                      </td>
                                      <td>
                                        <Badge bg="secondary">
                                          {toFixed2(
                                            stateAnalysis[key][key2][
                                              "avgClusterSize"
                                            ]
                                          )}
                                        </Badge>
                                      </td>
                                      <td>
                                        <Form.Check
                                          type="switch"
                                          id="ensemble-switch"
                                          style={{ width: "100%" }}
                                          checked={
                                            selectedDistanceMeasure === j - 3 &&
                                            selectedEnsemble === i + 1
                                          }
                                          onChange={(e) => {
                                            setselectedEnsemble(i + 1);
                                            setSelectedDistanceMeasure(j - 3);
                                          }}
                                        ></Form.Check>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </>
                      );
                    })
                : null}
              <Row className="mb-3">
                <Col>
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="mr-2"
                    onClick={handleShowGraph}
                  >
                    Open Cluster and Ensemble Size Association...
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleSShowDMEvaluation}
                  >
                    Open Distance Measure Evaluation...
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <>
            <Modal size="lg" show={showGraph} onHide={handleCloseGraph}>
              <Modal.Header closeButton>
                <Modal.Title>Ensemble Size and Cluster Association</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <EnsembleAssociationGraph
                    data={JSON.parse(JSON.stringify(associationSummary))}
                    selectedState={selectedState}
                  />
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseGraph}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Col>
      </Row>
      <Row>
        <Col>
          <>
            <Modal
              show={showDMEvaluation}
              size="xl"
              onHide={handleSCloseDMEvaluation}
            >
              <Modal.Header closeButton>
                <Modal.Title>Distance Measure Evaluation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <DMComparison
                    distanceMeasureComparison={distanceMeasureComparison}
                  />
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleSCloseDMEvaluation}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Col>
      </Row>
    </DataForm>
  );
}
