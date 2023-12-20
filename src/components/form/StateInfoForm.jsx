import { Row, Col, Tooltip, Card, Button, Badge, Table } from "react-bootstrap";

import DataForm from "../common/DataForm";
import api from "../../../api/client";
import {
  formatGetCurrentEnactedPlanUrl,
  formatGetStateSummaryUrl,
} from "../../../util/FormatUtil";
import { dataPlan } from "../../assets/testData";

import { useEffect, useState } from "react";
import {
  convertToPercentageString,
  convertToRatioPercents,
} from "../../utils/StringFormat";

/*
 * Placeholder for basic info about the set of ensembles that user selected
 * Info includes: 1) total number of random district plans (number), 2) average distance between distance plan pairs (number)
 * Option includes: 1) ensemble selection dropdown menu
 */

export default function StateInfoForm({
  selectedState,
  setSelectedState,
  setShowCurrentDistrictPlan,
  setCurrentlyEnactedPlan,
  setIsLoading,
  AZSummary,
  LASummary,
  NVSummary,
  setAZSummary,
  setLASummary,
  setNVSummary,
  setShowInitial,
}) {
  if (!AZSummary || !LASummary || !NVSummary) {
    return <div></div>;
  }

  console.log("AZSummary");
  console.log(AZSummary);

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
                      setCurrentlyEnactedPlan(AZSummary);
                      setSelectedState("AZ");
                      setShowCurrentDistrictPlan(true);
                      setShowInitial(false);
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
                              <tbody
                                style={{
                                  padding: "0px",
                                  fontSize: "12pt",
                                  margin: "0 0",
                                }}
                              >
                                <tr>
                                  <td>A.A %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        AZSummary["avgAAPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>White %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        AZSummary["avgWhitePercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Asian %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        AZSummary["avgAsianPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hispanic %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        AZSummary["avgHispanicPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Rep *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        AZSummary["totalRepublicanVotes"],
                                        AZSummary["totalDemocraticVotes"] +
                                          AZSummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Dem *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        AZSummary["totalDemocraticVotes"],
                                        AZSummary["totalDemocraticVotes"] +
                                          AZSummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {
                                        Array.from(
                                          AZSummary["whitePercentages"]
                                        ).length
                                      }
                                    </Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
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
                      setCurrentlyEnactedPlan(LASummary);
                      setSelectedState("LA");
                      setShowCurrentDistrictPlan(true);
                      setShowInitial(false);
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
                              <tbody
                                style={{
                                  padding: "0px",
                                  fontSize: "12pt",
                                  margin: "0 0",
                                }}
                              >
                                <tr>
                                  <td>A.A %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        LASummary["avgAAPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>White %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        LASummary["avgWhitePercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Asian %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        LASummary["avgAsianPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hispanic %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        LASummary["avgHispanicPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Rep *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        LASummary["totalRepublicanVotes"],
                                        LASummary["totalDemocraticVotes"] +
                                          LASummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Dem *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        LASummary["totalDemocraticVotes"],
                                        LASummary["totalDemocraticVotes"] +
                                          LASummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {
                                        Array.from(
                                          LASummary["whitePercentages"]
                                        ).length
                                      }
                                    </Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
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
                      setCurrentlyEnactedPlan(NVSummary);
                      setSelectedState("NV");
                      setShowCurrentDistrictPlan(true);
                      setShowInitial(false);
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
                              <tbody
                                style={{
                                  padding: "0px",
                                  fontSize: "12pt",
                                  margin: "0 0",
                                }}
                              >
                                <tr>
                                  <td>A.A %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        NVSummary["avgAAPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>White %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        NVSummary["avgWhitePercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Asian %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        NVSummary["avgAsianPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hispanic %</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToPercentageString(
                                        NVSummary["avgHispanicPercentage"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Rep *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        NVSummary["totalRepublicanVotes"],
                                        NVSummary["totalDemocraticVotes"] +
                                          NVSummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Dem *</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {convertToRatioPercents(
                                        NVSummary["totalDemocraticVotes"],
                                        NVSummary["totalDemocraticVotes"] +
                                          NVSummary["totalRepublicanVotes"]
                                      )}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Districts</td>
                                  <td>
                                    <Badge bg="secondary">
                                      {
                                        Array.from(
                                          NVSummary["whitePercentages"]
                                        ).length
                                      }
                                    </Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
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
    </DataForm>
  );
}
