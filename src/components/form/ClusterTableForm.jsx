import {
  Container,
  Table,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Breadcrumb,
} from "react-bootstrap";

import DataForm from "../common/DataForm";
import TableWrapper from "./TableExample";

import { useState } from "react";

export default function ClusterTableForm() {
  const [index, setIndex] = useState(0);

  return (
    <DataForm headerText={"ClusterTableForm"}>
      <Row className="mb-3">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Row>
                <Col className="align-middle">
                  <Stack direction="horizontal" gap={3}>
                    <span>Summary Table of </span>
                    <Breadcrumb>
                      {index === 0 ? (
                        <Breadcrumb.Item active>Ensemble #1</Breadcrumb.Item>
                      ) : (
                        <>
                          <Breadcrumb.Item>Ensemble #1</Breadcrumb.Item>
                          <Breadcrumb.Item active>
                            {"Cluster #" + Math.floor(Math.random() * 50)}
                          </Breadcrumb.Item>
                        </>
                      )}
                    </Breadcrumb>
                  </Stack>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <Row>
                <Col>
                  <TableWrapper />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Stack direction="horizontal" gap={3}>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-success"
                    >
                      {"Open in New Window..."}
                    </Button>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-primary"
                    >
                      {"Download .CSV..."}
                    </Button>
                    <Button
                      className="m-3 mt-0"
                      size="sm"
                      variant="outline-primary"
                      style={{ float: "right" }}
                    >
                      {"Learn More..."}
                    </Button>
                  </Stack>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Filter & View</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    Adjust Filter...
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    Change View Settings...
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-primary" size="sm">
                    Learn More...
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="info">
            <Card.Header>Voting Estimation</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <span>
                    In this Ensemble, see how the voting margins for each
                    cluster is calculated.
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-info" size="sm">
                    See How...
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
