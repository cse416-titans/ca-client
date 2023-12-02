// Components

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

// css
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import AnalysisWrapper from "./components/wrapper/AnalysisWrapper";
import Map from "./components/Map";
import MapWrapper from "./components/wrapper/MapWrapper";
import DisplayedPlansTab from "./components/DisplayedPlansTab";

function App() {
  const [stage, setStage] = useState(0);
  const [width, setWidth] = useState(6);

  const [displayedPlans, setDisplayedPlans] = useState([]); // {type:'cluster'|'plan', id:int, parent:null|clusterId}
  const [displayedPlansRight, setDisplayedPlansRight] = useState([]); // same
  const [selectedState, setSelectedState] = useState("Arizona");
  const [showCurrentDistrictPlan, setShowCurrentDistrictPlan] = useState(true);

  const [mapColorFilter, setMapColorFilter] = useState("default");

  const onChangeMapColorFilter = (e) => {
    setMapColorFilter(e.target.value);
  };

  return (
    <Container className="h-100" fluid style={{ position: "fixed" }}>
      <Row className="h-100">
        <Col lg={12 - width} className="m-0 p-0">
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
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                zIndex: 100000,
                margin: "10px 0 0 10px",
              }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button value={"white"} onClick={onChangeMapColorFilter}>
                    White View
                  </Button>
                  <Button value={"black"} onClick={onChangeMapColorFilter}>
                    Black View
                  </Button>
                  <Button value={"asian"} onClick={onChangeMapColorFilter}>
                    Asian View
                  </Button>
                  <Button value={"hispanic"} onClick={onChangeMapColorFilter}>
                    Hispanic View
                  </Button>
                  <Button
                    value={"AmericanIndian"}
                    onClick={onChangeMapColorFilter}
                  >
                    American Indian View
                  </Button>
                  <Button value={"majmin"} onClick={onChangeMapColorFilter}>
                    Majority-Minority View
                  </Button>
                  <Button value={"vote"} onClick={onChangeMapColorFilter}>
                    Vote View
                  </Button>
                  <Button value={"default"} onClick={onChangeMapColorFilter}>
                    Default View
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
              />
            </MapWrapper>
          </Col>
        ) : null}
        {displayedPlansRight.length === 0 ? (
          <Col
            lg={width}
            className="px-0"
            style={{ boxShadow: "10px 5px 5px red", zIndex: 1 }}
          >
            <Stack gap={0} className="content-center">
              <Header>
                <h2>Titan: Redistricting Cluster Analyzer</h2>
              </Header>
              <AnalysisWrapper
                displayedPlans={displayedPlans}
                setDisplayedPlans={setDisplayedPlans}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                setShowCurrentDistrictPlan={setShowCurrentDistrictPlan}
              />
            </Stack>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
}

export default App;
