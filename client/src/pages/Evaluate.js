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
        <div className=""> 
          <Col>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Available Cards"
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
        </div>
        <div className=""> 
          <Col>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Available Cards"
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
        </div>

        </Row>
      </Container>
  );
}

export default Evaluate;
