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
import Footer from "./components/layout/Footer";
import AnalysisContainer from "./components/AnalysisContainer";

function App() {
  const [stage, setStage] = useState(0);

  return (
    <Container className="h-100" fluid style={{ position: "fixed" }}>
      <Row className="h-100">
        <Col lg={6}>col 1</Col>
        <Col lg={6} className="px-0">
          <Stack gap={0} className="content-center">
            <Header>
              <h3>Louisianna</h3>
            </Header>
            <AnalysisContainer />
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
