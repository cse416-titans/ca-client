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

function App() {
  const [stage, setStage] = useState(0);
  const [width, setWidth] = useState(6);

  return (
    <Container className="h-100" fluid style={{ position: "fixed" }}>
      <Row className="h-100">
        <Col lg={12 - width}>col 1</Col>
        <Col lg={width} className="px-0">
          <Stack gap={0} className="content-center">
            <Header>
              <h2>Titan: Redistricting Cluster Analyzer</h2>
            </Header>
            <AnalysisWrapper />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

/*
<Col style={{ padding: "25px 0", overflow: "hidden" }}>
          {stage === 0 && <ClusteringPane setStage={setStage} />}
          {stage === 1 && <ClusterAnalysisPane setStage={setStage} />}
          {stage === 2 && <PlanAnalysisPane setStage={setStage} />}
</Col>
*/
