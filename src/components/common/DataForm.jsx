import { Container, Row, Col } from "react-bootstrap";

export default function DataForm({ children, headerText }) {
  return (
    <Container>
      <Row>
        <Col>
          <h3>{headerText}</h3>
        </Col>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
}
