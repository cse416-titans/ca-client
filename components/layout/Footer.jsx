import { Container, Pagination } from "react-bootstrap";

export default function Footer() {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container
      className="h-10 position-fixed bottom-0 right-0 content-center text-center"
      style={{ width: "fit-content" }}
    >
      <h1>footer</h1>
    </Container>
  );
}
