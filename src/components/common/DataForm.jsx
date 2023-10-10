import { Container, Row, Col, Button } from "react-bootstrap";

export default function DataForm({ children, headerText }) {
  return (
    <Container className="mt-3">
      {/*      <Row className="mb-3">
        <Col>
          <div style={{ textTransform: "uppercase" }}>{headerText}</div>
        </Col>
  </Row>*/}
      <Row>{children}</Row>
    </Container>
  );
}
