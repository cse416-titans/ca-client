import { Row, Col, Tooltip, Card, Button, Badge, Table } from "react-bootstrap";

import DataForm from "../common/DataForm";
import axios from 'axios';
import { useState, useEffect } from "react";

export default function ClientServerForm() {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [nameResponse, setNameResponse] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/getdata')
      .then(response => {
        console.log("hello");
        console.log(response);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); 

  const handleClick = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/saymyname?name=${name}`)
      .then(response => {
        console.log("submit");
        console.log(response);
        setNameResponse(response.data.name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <DataForm headerText={"EnsembleInfoForm"}>
      <Row className="mb-33">
        <Col>
          <Card>
            <Card.Header>Example for "GET"</Card.Header>
            <Card.Body>
            {data}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>-----------------------------</div>
      <Row className="mb-44">
        <Col>
          <Card>
            <Card.Header>Example for "POST"</Card.Header>
            <Card.Body>
            <form>
              <label>
                Type Your Name : 
                <input type="text" onChange={(e) => setName(e.target.value)}/>
              </label>
            </form>
            <Button variant="outline-info" size="sm" onClick={handleClick}>
              Submit
            </Button>
            <div>
              {nameResponse}
            </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
