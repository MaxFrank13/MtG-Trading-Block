import React from "react";

import {
  Container,
  Row,
  Col,
  Stack,
  ListGroup,
  Form,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

function Evaluate() {
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="backDrop text-center">Trade Evaluator</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Cards To Give"
              className="me-2"
              aria-label="Search"
            />
            <>
              <style type="text/css">
                {`
                                .btn-search {
                                background-color: transparent;
                                color: #00ADB5;
                                cursor: pointer;
                                border: 2px solid #00ADB5;
                                margin-right: 5%;
                                } 
                                .btn-search:hover {
                                box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                                color: #00ADB5;
                                }
                                `}
              </style>
              <Button variant="search" size="lg">
                Search
              </Button>
            </>
          </Form>
          <Row className="valRow">
            <Col className="backDrop text-center">
              <h4>Total Value $$</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Col>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col className="bar" xs="auto">
        </Col>

        <Col className="eval">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Cards To Receive"
              className="me-2"
              aria-label="Search"
            />
            <>
              <style type="text/css">
                {`
                                .btn-search-trade {
                                background-color: transparent;
                                color: #FF5722;
                                cursor: pointer;
                                border: 2px solid #FF5722;
                                margin-right: 5%;
                                } 
                                .btn-search-trade:hover {
                                box-shadow: inset 0px 0px 8px #FF5722, 0 0 15px #FF5722;
                                color: #FF5722;
                                }
                                `}
              </style>
              <Button variant="search-trade" size="lg">
                Search
              </Button>
            </>
          </Form>
          <Row className="valRow">
            <Col className="backDrop text-center">
              <h4>Total Value $$</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox">
            {Array.from({ length: 12 }).map((_, idx) => (
              <Col>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Evaluate;
