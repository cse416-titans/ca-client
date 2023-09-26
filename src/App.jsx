// Components
import Map from "./components/map-pane/Map";

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// css
import "./App.css";
import ClusteringPane from "./components/clustering-pane/ClusteringPane";
import { useState } from "react";
import ClusterAnalysisPane from "./components/clustering-pane/ClusterAnalysisPane";
import PlanAnalysisPane from "./components/clustering-pane/PlanAnalysisPane";

function App() {
  const [stage, setStage] = useState(0);

  return (
    <Container fluid style={{ overflow: "hidden" }}>
      <Row style={{ height: "100vh" }}>
        <Col>
          <Map />
        </Col>
        <Col style={{ padding: "25px 0", overflow: "hidden" }}>
          {stage === 0 && <ClusteringPane setStage={setStage} />}
          {stage === 1 && <ClusterAnalysisPane setStage={setStage} />}
          {stage === 2 && <PlanAnalysisPane setStage={setStage} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
