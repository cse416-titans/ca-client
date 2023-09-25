// Components
import Map from "./components/map/Map";

// styled elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// css
import "./App.css";

function App() {
  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col style={{ backgroundColor: "pink", padding: 0 }}>
          <Map />
        </Col>
        <Col style={{ backgroundColor: "red" }}>2 of 2</Col>
      </Row>
    </Container>
  );
}

export default App;
