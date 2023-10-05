import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  Accordion,
} from "react-bootstrap";
import ModalExample from "./ModalExample";

function BreadcrumbExample({ setStage }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="" active onClick={() => setStage(0)}>
        Home
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

function BasicExample({ setStage }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ensembles #1</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <Col xxs={12}>
                <div>
                  <span>
                    State: <b>Nevada</b>
                  </span>
                </div>
                <div>
                  <span>
                    Clustering Method: <b>ABC</b>
                  </span>
                </div>
                <div>
                  <span>
                    Created: <b>2023-9-24</b>
                  </span>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ height: "100%", width: "100%", float: "right" }}
                  onClick={() => {
                    setStage(1);
                  }}
                >
                  Analyze...
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Ensembles #2</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <Col xxs={12}>
                <div>
                  <span>
                    State: <b>Nevada</b>
                  </span>
                </div>
                <div>
                  <span>
                    Clustering Method: <b>ABC</b>
                  </span>
                </div>
                <div>
                  <span>
                    Created: <b>2023-9-24</b>
                  </span>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ height: "100%", width: "100%", float: "right" }}
                >
                  Analyze...
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Ensembles #3</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <Col xxs={12}>
                <div>
                  <span>
                    State: <b>Nevada</b>
                  </span>
                </div>
                <div>
                  <span>
                    Clustering Method: <b>ABC</b>
                  </span>
                </div>
                <div>
                  <span>
                    Created: <b>2023-9-24</b>
                  </span>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ height: "100%", width: "100%", float: "right" }}
                >
                  Analyze...
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function ClusteringPane({ setStage }) {
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <Container>
        <Row>
          <BreadcrumbExample setStage={setStage} />
        </Row>
        <Row>
          <Col className="my-auto">
            <h1>Home</h1>
          </Col>
          <Col className="my-auto">
            <ModalExample />
          </Col>
        </Row>
        <Row>
          <BasicExample setStage={setStage} />
        </Row>
      </Container>
    </div>
  );
}

export default ClusteringPane;
