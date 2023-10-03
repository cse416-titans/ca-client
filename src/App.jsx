// Components

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Stack } from "react-bootstrap";

// css
import "./App.css";
import { useState } from "react";
import Header from "./components/layout/Header";
import AnalysisWrapper from "./components/wrapper/AnalysisWrapper";
import Map from "./components/Map";
import MapWrapper from "./components/wrapper/MapWrapper";
import DisplayedPlansTab from "./components/DisplayedPlansTab";

function App() {
  const [stage, setStage] = useState(0);
  const [width, setWidth] = useState(6);

  const [displayedPlans, setDisplayedPlans] = useState([]); // {type:'cluster'|'plan', id:int, parent:null|clusterId}
  const [selectedState, setSelectedState] = useState("Arizona");

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
              />
            </div>
            <Map selectedState={selectedState} />
          </MapWrapper>
        </Col>
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
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
