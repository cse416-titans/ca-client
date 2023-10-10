import { Container, Row } from "react-bootstrap";

export default function DescriptedClickable({ children, headerText }) {
  return (
    <Container>
      <Row>
        <span>{headerText}</span>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
}
