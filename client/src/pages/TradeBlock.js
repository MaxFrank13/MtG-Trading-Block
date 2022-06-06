import React from "react";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";

function TradeBlock() {

  return (
    <div className="backDrop text-center">
      <Container fluid="md">
        <Row>
          <Col>
            <h3>Trading Block</h3>
          </Col>
        </Row>
        <Row className="search">
          <Col>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Available Collections"
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
        <Row>
          <Col>
            <>
              {[
                "Test Message One ",
                "Test Message Two",
                "Test Message Three",
              ].map((message) => (
                <ListGroup>
                  {/* <ListGroup.Item action variant="secondary">{message}</ListGroup.Item> */}
                  <ListGroup.Item action variant="dark">
                    {message}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </>
          </Col>
        </Row>
        <Row className="post">
          <Col>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Trade Message"
                className="me-2"
                aria-label="Post Trade"
              />
              <>
                <style type="text/css">
                  {`
                                .btn-post {
                                background-color: transparent;
                                color: #FF5722;
                                cursor: pointer;
                                border: 2px solid #FF5722;
                                margin-right: 1%;
                                } 
                                .btn-post:hover {
                                box-shadow: inset 0px 0px 8px #FF5722, 0 0 15px #FF5722;
                                color: #FF5722;
                                }
                                `}
                </style>
                <Button variant="post" size="lg">
                  Post
                </Button>
              </>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TradeBlock;
