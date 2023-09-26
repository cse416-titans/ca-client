import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function ModalExampleAddFilter() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ float: "right" }}>
        Add New Filter...
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Filtering Data</h4>
            <ListGroup>
              <ListGroup.Item>Voting Margin</ListGroup.Item>
              <ListGroup.Item>Demographic Margin</ListGroup.Item>
              <ListGroup.Item>Income Margin</ListGroup.Item>
              <ListGroup.Item>Compactness Index</ListGroup.Item>
            </ListGroup>
            <h4>Range</h4>
            <Form.Label>Min</Form.Label>
            <Form.Range />
            <Form.Label>Max</Form.Label>
            <Form.Range />
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

export default ModalExampleAddFilter;
