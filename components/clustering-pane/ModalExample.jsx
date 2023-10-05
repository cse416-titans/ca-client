import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function DefaultDistanceMeasureExample() {
  return (
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

function DefaultStateExample() {
  return (
    <ListGroup>
      <ListGroup.Item>Arizona</ListGroup.Item>
      <ListGroup.Item>Louisianna</ListGroup.Item>
      <ListGroup.Item>Nevada</ListGroup.Item>
    </ListGroup>
  );
}

function ModalExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ float: "right" }}>
        Create New Ensembles...
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Ensembles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>State</h4>
            <DefaultStateExample />
            <h4>Clustering Method (Distance Measure)</h4>
            <DefaultDistanceMeasureExample />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExample;
