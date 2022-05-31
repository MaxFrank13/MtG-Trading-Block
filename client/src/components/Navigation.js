import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <span className="mtg">Magic: Trading Block</span>
      <Container>
          <Navbar.Brand className="navOp" href="/">Open Trades</Navbar.Brand>
          {/* <Navbar.Brand className="navOp" href="/profile">Profile</Navbar.Brand>
          <Navbar.Brand className="navOp" href="/collection">Collection</Navbar.Brand> */}
          <Nav className="me-auto">
          <Nav.Link className="navOp" href="/profile">Profile</Nav.Link>
          <Nav.Link className="navOp" href="/collection">Collection</Nav.Link>
          {/* <Nav.Link className="navOp" href="/">Open Trades</Nav.Link> */}
          {/* <Nav.Link className="navOp" href="/logout">Log Out</Nav.Link> */}
          {/* <Nav.Link className="navOp" href="/newTrade">New Trade</Nav.Link> */}
        </Nav>

        {/* <Form className="d-flex">
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
        </Form> */}

        <Navbar.Brand className="logout" href="/logout">Log Out</Navbar.Brand>

      </Container>
    </Navbar>
  );
}

export default Navigation;
