import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import BubbleChart from "./BubbleChart";

function BreadcrumbExample({ setStage }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="" active onClick={() => setStage(0)}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="" active>
        Cluster Analysis
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

function ClusterAnalysisPane({ setStage }) {
  return (
    <div style={{ height: "100%" }}>
      <Container>
        <Row>
          <BreadcrumbExample setStage={setStage} />
        </Row>
        <Row>
          <Col className="my-auto">
            <h1>Cluster Analysis</h1>
          </Col>
          <Col className="my-auto"></Col>
        </Row>
        <Row>
          <Col style={{ padding: "50px" }}>
            <BubbleChart />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClusterAnalysisPane;
