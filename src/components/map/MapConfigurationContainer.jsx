import PropTypes from "prop-types";

import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover bottom</Popover.Header>
    <Popover.Body>Hello</Popover.Body>
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
    <Button variant="success">More Info...</Button>
  </OverlayTrigger>
);

function MapConfigurationContainer({ lng, lat, zoom }) {
  return (
    <div
      style={{
        width: "fit-content",
        position: "fixed",
        top: 0,
        left: 0,
        margin: "1rem",
      }}
    >
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span>
                State: <b>Arizona</b>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Arizona</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Louisianna</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Nevada</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span>
                Distance Measure: <b>XXX</b>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Distance Measure 1
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Distance Measure 2
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Distance Measure 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Example />
        </Col>
      </Row>
    </div>
  );
}

MapConfigurationContainer.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MapConfigurationContainer;
