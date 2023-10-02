import {
  ListGroup,
  Card,
  Row,
  Col,
  Button,
  Popover,
  OverlayTrigger,
  Stack,
  Form,
} from "react-bootstrap";

const popover = (i) => {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Cluster {i + 1}</Popover.Header>
      <Popover.Body>
        <Row className="mb-1">
          <b>Information</b>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="outline-primary" size="sm">
              View In Detail...
            </Button>
          </Col>
        </Row>
        <Row className="mb-1">
          <b>Display Option</b>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form>
              <Form.Check
                type={"radio"}
                name="clusterdisplayoption"
                label={`Show Approximation of the Cluster`}
              />
              <Form.Check
                type={"radio"}
                name="clusterdisplayoption"
                label={`Show Plans in the Cluster`}
              />
            </Form>
          </Col>
        </Row>
        <Row className="mb-1">
          <b>Show Up To...</b>
        </Row>
        <Row>
          <Col>
            <Form>
              <>
                <Form.Label>Number of Plans</Form.Label>
                <Form.Range />
              </>
            </Form>
          </Col>
        </Row>
      </Popover.Body>
    </Popover>
  );
};

export default function DisplayedPlansTab({
  displayedPlans,
  setDisplayedPlans,
}) {
  const onRemove = (e) => {
    setDisplayedPlans(
      displayedPlans.filter((plan) => plan.id !== parseInt(e.target.value))
    );
  };

  return (
    <Card>
      <Card.Header>Displayed Plans</Card.Header>
      <ListGroup variant="flush">
        {displayedPlans.map((plan, i) => {
          return (
            <ListGroup.Item key={i} className="px-0">
              <Row>
                <Col>
                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="justify-content-center"
                  >
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      overlay={popover(0)}
                    >
                      <Button variant="outline-secondary" size="sm">
                        Cluster {plan.id}
                      </Button>
                    </OverlayTrigger>
                    <Button
                      onClick={onRemove}
                      variant="outline-danger"
                      size="sm"
                      value={plan.id}
                    >
                      X
                    </Button>
                  </Stack>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}
