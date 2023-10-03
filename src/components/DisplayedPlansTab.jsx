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
import { capitalizeFirstLetter } from "../utils/StringFormat";

const popover = (
  plan,
  displayedPlans,
  setDisplayedPlans,
  displayedPlansRight,
  setDisplayedPlansRight
) => {
  return (
    <Popover id="popover-basic">
      {plan.type === "cluster" ? (
        <Popover.Header as="h3">Cluster #{plan.id}</Popover.Header>
      ) : (
        <Popover.Header as="h3">
          Plan #{plan.id} From Cluster # {plan.parent}
        </Popover.Header>
      )}
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
        {plan.type === "cluster" ? (
          <>
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
              <b>Show On Different Screen</b>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Check
                    type={"checkbox"}
                    name={"showonrightmap"}
                    label={`Show On Right Map`}
                    checked={displayedPlansRight.includes(plan)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDisplayedPlansRight([...displayedPlansRight, plan]);
                        setDisplayedPlans(
                          displayedPlans.filter(
                            (p) => p.id !== plan.id || p.type !== plan.type
                          )
                        );
                      } else {
                        setDisplayedPlansRight(
                          displayedPlansRight.filter(
                            (p) => p.id !== plan.id || p.type !== plan.type
                          )
                        );
                      }
                    }}
                  ></Form.Check>
                </Form>
              </Col>
            </Row>
            <Row className="mb-1 mt-3">
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
          </>
        ) : null}
      </Popover.Body>
    </Popover>
  );
};

export default function DisplayedPlansTab({
  displayedPlans,
  setDisplayedPlans,
  showCurrentDistrictPlan,
  setShowCurrentDistrictPlan,
  displayedPlansRight,
  setDisplayedPlansRight,
}) {
  const onRemove = (e) => {
    setDisplayedPlans(
      displayedPlans.filter((plan) => plan.id !== parseInt(e.target.value))
    );
    setDisplayedPlansRight(
      displayedPlansRight.filter((plan) => plan.id !== parseInt(e.target.value))
    );
  };

  return (
    <Row>
      <Col>
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
                          overlay={popover(
                            plan,
                            displayedPlans,
                            setDisplayedPlans,
                            displayedPlansRight,
                            setDisplayedPlansRight
                          )}
                        >
                          <Button variant="outline-secondary" size="sm">
                            {capitalizeFirstLetter(plan.type)} #{plan.id}
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
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Form.Check
              type={"checkbox"}
              id={"default-checkbox"}
              label={"Show Current Distrct Plan"}
              style={{ backgroundColor: "white" }}
              checked={showCurrentDistrictPlan}
              onChange={(e) => {
                setShowCurrentDistrictPlan(e.target.checked);
              }}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
