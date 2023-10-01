// Components
import Map from "./components/map-pane/Map";

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Stack } from "react-bootstrap";

// css
import "./App.css";
import ClusteringPane from "./components/clustering-pane/ClusteringPane";
import { useState } from "react";
import ClusterAnalysisPane from "./components/clustering-pane/ClusterAnalysisPane";
import PlanAnalysisPane from "./components/clustering-pane/PlanAnalysisPane";
import Header from "./components/layout/Header";
import ContentsContainer from "./components/layout/ContentsContainer";
import Footer from "./components/layout/Footer";
import AnalysisContainer from "./components/AnalysisContainer";
import ClusterPlotForm from "./components/ClusterPlotForm";

function App() {
  const [stage, setStage] = useState(0);

  return (
    <Container className="h-100" fluid>
      <Row className="h-100">
        <Col lg={4}>col 1</Col>
        <Col lg={8} className="px-0">
          <Stack gap={3} className="content-center">
            <Header>
              <h1>STATE_NAME</h1>
            </Header>
            <AnalysisContainer />
            <Footer />
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
