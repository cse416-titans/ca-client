import { Container, Row } from "react-bootstrap";

export default function Header({ children }) {
  return (
    <Container>
      <Row>{children}</Row>
    </Container>
  );
}
