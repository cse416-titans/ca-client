import {
  Container,
  Row,
  Col,
  Breadcrumb,
  ListGroup,
  Form,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import BubbleChart from "./BubbleChart";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClusterGraph from "./ClusterGraph";
import TableExample from "./TableExample";
import ModalExampleAddFilter from "./ModalExampleAddFilter";

function BreadcrumbExample({ setStage }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item onClick={() => setStage(0)}>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="" active>
        Clustering #1
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

function ClusterAnalysisPane({ setStage }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <Container>
        <Row>
          <BreadcrumbExample setStage={setStage} />
        </Row>
        <Row>
          <Col className="my-auto">
            <h1>Cluster Analysis</h1>
          </Col>
          <Col className="my-auto"></Col>
        </Row>
        <Row style={{ height: "40%" }}>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="home" title="Search">
              <Row style={{ height: "50%", overflowY: "scroll" }}>
                <Row>
                  <Col style={{ padding: "10px 100px" }}>
                    <BubbleChart setStage={setStage} />
                  </Col>
                </Row>
                <Col>
                  <Row>
                    <h4>Sort By...</h4>
                  </Row>
                  <Row>
                    <span>Criteria</span>
                    <ListGroup>
                      <ListGroup.Item>Vote Margin</ListGroup.Item>
                      <ListGroup.Item>Compactness</ListGroup.Item>
                      <ListGroup.Item>
                        Maj vs. Min ethnicity ratio
                      </ListGroup.Item>
                      <ListGroup.Item>Income Margin</ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row>
                    <span>Sorting Order</span>
                    <ListGroup>
                      <ListGroup.Item>Ascending</ListGroup.Item>
                      <ListGroup.Item>Descending</ListGroup.Item>
                    </ListGroup>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <h4>Search by filter</h4>
                  </Row>
                  <Row>
                    <Row>
                      <Col>
                        <span>Filter List</span>
                      </Col>
                      <Col>
                        <ModalExampleAddFilter />
                      </Col>
                    </Row>

                    <ListGroup>
                      <ListGroup.Item>
                        <span>
                          1. Income Margin: <b>{"> 10 %"}</b>
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span>
                          2. Maj. vs Min. Ethinicy ratio: <b>{"1:1.5"}</b>
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span>
                          3. Vote Margin: <b>{"< 7 %"}</b>
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="profile" title="Graphs">
              <Container>
                <Row
                  className="justify-content-center"
                  style={{ width: "100%" }}
                >
                  <ClusterGraph />
                </Row>
                <Row>
                  <Col>
                    <span>Graph that you created</span>
                    <ListGroup>
                      <ListGroup.Item>Name1</ListGroup.Item>
                      <ListGroup.Item>Name2</ListGroup.Item>
                      <ListGroup.Item>Name3</ListGroup.Item>
                      <ListGroup.Item>Name4</ListGroup.Item>
                      <ListGroup.Item>Name5</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col>
                    <Row>
                      <Form.Label htmlFor="inputPassword5">
                        Graph Name
                      </Form.Label>
                      <Form.Control type="text" id="inputPassword5" />
                    </Row>
                    <Row>
                      <Form.Label htmlFor="inputPassword6">
                        Data to include
                      </Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Voting Margin"
                      >
                        <Dropdown.Item href="#/action-1">
                          Voting Margin
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Data Option 2
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Data Option 3
                        </Dropdown.Item>
                      </DropdownButton>
                    </Row>
                    <Row>
                      <Form.Label htmlFor="inputPassword6">
                        Graph Type
                      </Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Probability Distribution"
                      >
                        <Dropdown.Item href="#/action-1">
                          Probability Distribution
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Plot Option 2
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Plot Option 3
                        </Dropdown.Item>
                      </DropdownButton>
                      <Button style={{ marginTop: "10px" }} variant="success">
                        Create Graph
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="longer-tab" title="Tables">
              <TableExample />
            </Tab>
            <Tab eventKey="contact" title="How to..." disabled>
              Tab content for Contact
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  );
}

export default ClusterAnalysisPane;
