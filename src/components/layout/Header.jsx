import { Container, Row } from "react-bootstrap";

export default function Header({ children }) {
  return (
    <Container
      className="text-start my-3 px-4"
      style={{ textShadow: "rgba(0,0,0,0.3) 0.5px 2px 3px" }}
    >
      <Row>{children}</Row>
    </Container>
  );
}
