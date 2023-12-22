// Components

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

// css
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import AnalysisWrapper from "./components/wrapper/AnalysisWrapper";
import Map from "./components/Map";
import MapWrapper from "./components/wrapper/MapWrapper";
import DisplayedPlansTab from "./components/DisplayedPlansTab";
import axios from "axios";
import { formatGetCurrentEnactedPlanUrl } from "../util/FormatUtil";
import api from "../api/client";

function App() {
  axios.defaults.withCredentials = true;

  const [stage, setStage] = useState(0);
  const [width, setWidth] = useState(6);

  const [displayedPlans, setDisplayedPlans] = useState([]); // {type:'cluster'|'plan', id:int, parent:null|clusterId}
  const [displayedPlansRight, setDisplayedPlansRight] = useState([]); // same
  const [selectedState, setSelectedState] = useState(null);
  const [selectedEnsemble, setselectedEnsemble] = useState(1);
  const [selectedDistanceMeasure, setSelectedDistanceMeasure] = useState(1); // 1: hamming, 2: entroy, 3: optimal transport
  const [showCurrentDistrictPlan, setShowCurrentDistrictPlan] = useState(true);

  const [mapColorFilter, setMapColorFilter] = useState("default");

  const [currentlyEnactedPlan, setCurrentlyEnactedPlan] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showInitial, setShowInitial] = useState(true);

  const onChangeMapColorFilter = (e) => {
    setMapColorFilter(e.target.value);
  };

  const [AZSummary, setAZSummary] = useState(null);
  const [LASummary, setLASummary] = useState(null);
  const [NVSummary, setNVSummary] = useState(null);

  useEffect(() => {
    const url = formatGetCurrentEnactedPlanUrl("az_curr.json");

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAZSummary(data);
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  useEffect(() => {
    const url = formatGetCurrentEnactedPlanUrl("la_curr.json");

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setLASummary(data);
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  useEffect(() => {
    const url = formatGetCurrentEnactedPlanUrl("nv_curr.json");

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setNVSummary(data);
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <Container className="h-100" fluid style={{ position: "fixed" }}>
      <Row className="h-100">
        <Col lg={12 - width} className="m-0 p-0">
          <div
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: "999999999",
              visibility: isLoading ? "visible" : "hidden",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          ></div>
          <MapWrapper>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 100000,
                margin: "10px 0 0 10px",
              }}
            >
              <DisplayedPlansTab
                displayedPlans={displayedPlans}
                setDisplayedPlans={setDisplayedPlans}
                showCurrentDistrictPlan={showCurrentDistrictPlan}
                setShowCurrentDistrictPlan={setShowCurrentDistrictPlan}
                displayedPlansRight={displayedPlansRight}
                setDisplayedPlansRight={setDisplayedPlansRight}
                setMapColorFilter={setMapColorFilter}
                setCurrentlyEnactedPlan={setCurrentlyEnactedPlan}
                setIsLoading={setIsLoading}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                zIndex: 100000,
                margin: "0px 0 0 0px",
                width: "50%",
              }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                    Map View:
                  </span>
                  <Button
                    variant={
                      mapColorFilter === "white" ? "primary" : "outline-primary"
                    }
                    size="sm"
                    value={"white"}
                    onClick={onChangeMapColorFilter}
                  >
                    White
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "black" ? "primary" : "outline-primary"
                    }
                    size="sm"
                    value={"black"}
                    onClick={onChangeMapColorFilter}
                  >
                    A-A
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "asian" ? "primary" : "outline-primary"
                    }
                    size="sm"
                    value={"asian"}
                    onClick={onChangeMapColorFilter}
                  >
                    Asian
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "hispanic"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="sm"
                    value={"hispanic"}
                    onClick={onChangeMapColorFilter}
                  >
                    Hispanic
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "AmericanIndian"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="sm"
                    value={"AmericanIndian"}
                    onClick={onChangeMapColorFilter}
                  >
                    A-Indian
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "majmin"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="sm"
                    value={"majmin"}
                    onClick={onChangeMapColorFilter}
                  >
                    Maj-Min
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "vote" ? "primary" : "outline-primary"
                    }
                    size="sm"
                    value={"vote"}
                    onClick={onChangeMapColorFilter}
                  >
                    Vote
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "default"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="sm"
                    value={"default"}
                    onClick={onChangeMapColorFilter}
                  >
                    District
                  </Button>
                  <Button
                    variant={
                      mapColorFilter === "highlight"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="sm"
                    value={"highlight"}
                    onClick={onChangeMapColorFilter}
                  >
                    Highlight Borders
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <Map
              displayedPlans={displayedPlans}
              selectedState={selectedState}
              showCurrentDistrictPlan={showCurrentDistrictPlan}
              isRight={false}
              mapColorFilter={mapColorFilter}
              currentlyEnactedPlan={currentlyEnactedPlan}
              setCurrentlyEnactedPlan={setCurrentlyEnactedPlan}
              showInitial={showInitial}
              AZSummary={AZSummary}
              LASummary={LASummary}
              NVSummary={NVSummary}
            />
          </MapWrapper>
        </Col>
        {displayedPlansRight.length > 0 ? (
          <Col>
            <MapWrapper>
              <Map
                displayedPlans={displayedPlansRight}
                setDisplayedPlans={setDisplayedPlansRight}
                selectedState={selectedState}
                showCurrentDistrictPlan={showCurrentDistrictPlan}
                isRight={true}
                mapColorFilter={mapColorFilter}
                currentlyEnactedPlan={currentlyEnactedPlan}
                setCurrentlyEnactedPlan={setCurrentlyEnactedPlan}
                showInitial={showInitial}
                AZSummary={AZSummary}
                LASummary={LASummary}
                NVSummary={NVSummary}
              />
            </MapWrapper>
          </Col>
        ) : null}
        <Col
          lg={width}
          className="px-0"
          style={{ boxShadow: "10px 5px 5px red", zIndex: 1 }}
        >
          <Stack gap={0} className="content-center">
            <Header>
              <Row>
                <Col>
                  <h4
                    onClick={(e) => {
                      window.location.reload();
                    }}
                    style={{ fontWeight: "bold" }}
                    className="refresh"
                  >
                    Titan: Redistricting Cluster Analyzer
                  </h4>
                </Col>
              </Row>
            </Header>

            <AnalysisWrapper
              displayedPlans={displayedPlans}
              setDisplayedPlans={setDisplayedPlans}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedEnsemble={selectedEnsemble}
              setselectedEnsemble={setselectedEnsemble}
              selectedDistanceMeasure={selectedDistanceMeasure}
              setSelectedDistanceMeasure={setSelectedDistanceMeasure}
              setShowCurrentDistrictPlan={setShowCurrentDistrictPlan}
              setCurrentlyEnactedPlan={setCurrentlyEnactedPlan}
              setIsLoading={setIsLoading}
              currentlyEnactedPlan={currentlyEnactedPlan}
              showInitial={showInitial}
              setShowInitial={setShowInitial}
              AZSummary={AZSummary}
              LASummary={LASummary}
              NVSummary={NVSummary}
              setAZSummary={setAZSummary}
              setLASummary={setLASummary}
              setNVSummary={setNVSummary}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
