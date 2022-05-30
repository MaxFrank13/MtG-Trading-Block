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
      <span className="mtg">Magic: The Gathering</span>
      <Container>
        <Navbar.Brand href="/">Trading Block</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/binder">Binder</Nav.Link>
          <Nav.Link href="/newTrade">Create Trade</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search Cards"
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
          {/* <Button variant="outline-info">Search</Button> */}
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navigation;
