import React from "react";
// import { Card } from 'react-bootstrap';
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  ListGroup,
} from "react-bootstrap";
function Profile() {
  return (
    <div className="backDrop">
      <Container fluid="md">
        <Row>
          <Col>
            <h3>Welcome User</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="tradeProp tradeProfile" style={{ width: "22rem" }}>
              {/* <Card.Header>Featured</Card.Header> */}
              <Accordion  flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Trade Proposals</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      <ListGroup.Item>No style</ListGroup.Item>
                      <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                      <ListGroup.Item action variant="secondary">
                        Secondary
                      </ListGroup.Item>
                      <ListGroup.Item action variant="success">
                        Success
                      </ListGroup.Item>
                      <ListGroup.Item action variant="danger">
                        Danger
                      </ListGroup.Item>
                      <ListGroup.Item action variant="warning">
                        Warning
                      </ListGroup.Item>
                      <ListGroup.Item action variant="info">
                        Info
                      </ListGroup.Item>
                      <ListGroup.Item action variant="light">
                        Light
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark">
                        Dark
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Col>

          <Col>
            <Card className="tradeHistory tradeProfile" style={{ width: "22rem" }}>
              {/* <Card.Header>Featured</Card.Header> */}
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Trade History</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      <ListGroup.Item>No style</ListGroup.Item>
                      <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                      <ListGroup.Item action variant="secondary">
                        Secondary
                      </ListGroup.Item>
                      <ListGroup.Item action variant="success">
                        Success
                      </ListGroup.Item>
                      <ListGroup.Item action variant="danger">
                        Danger
                      </ListGroup.Item>
                      <ListGroup.Item action variant="warning">
                        Warning
                      </ListGroup.Item>
                      <ListGroup.Item action variant="info">
                        Info
                      </ListGroup.Item>
                      <ListGroup.Item action variant="light">
                        Light
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark">
                        Dark
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Profile;
