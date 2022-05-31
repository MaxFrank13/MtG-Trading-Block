import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Collection() {
  return (
    <div className="backDrop text-center">
      <Container fluid="md">
        <Row>
          <Col>
            <h3>My Collection</h3>
          </Col>
        </Row>
        <Row className="search">
          <Col>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Collection"
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
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
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
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Collection;
