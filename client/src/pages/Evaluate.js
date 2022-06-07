import React, { useState } from "react";

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
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [cardNotFound, setCardNotFound] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchInput}&unique=prints`);

      if (!response.ok) {
        setCardNotFound(true)
        throw new Error('something went wrong!');
      }

      const { data } = await response.json();

      const cardData = data.map((card) => ({
        scryfall_id: card.id,
        name: card.name,
        imageSmall: card.card_faces ? card.card_faces[0].image_uris.small : card.image_uris.small,
        imageNormal: card.card_faces ? card.card_faces[0].image_uris.normal : card.image_uris.normal,
        price: card.prices.usd
      }));

      setSearchedCards(cardData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="backDrop text-center">Trade Evaluator</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center giveH2">Cards To Give</h2>
          <Row className="valRow">
            <Col className="backDropTv text-center">
              <h4>Total Value $$</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox text-center">
            {Array.from({ length: 4 }).map((_, idx) => (
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

        <Col>
        <h2 className="text-center receiveH2">Cards To Receive</h2>
          <Row className="valRow">
            <Col className="backDropTv text-center">
              <h4>Total Value $$</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox text-center">
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
      </Row>
    
    <div className="backDropTradeSearch text-center">
      {/* <Row>
        <Col>
          <h3>Find Cards</h3>
        </Col>
      </Row> */}
      <Row className="search">
        <Col>
          <Form className="d-flex" onSubmit={handleFormSubmit}>
            <FormControl
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
                  margin-right: 5%;
                  } 
                  .btn-search:hover {
                              box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                              color: #00ADB5;
                              }
                `}
              </style>
              <Button type="submit" variant="search" size="lg">
                Search
              </Button>
            </>
          </Form>
          {cardNotFound && (
            <div className="my-3 p-3 bg-danger text-white">
            Card Not Found
          </div>
          )}
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {searchedCards.map((card) => {
          return (
            <Col key={card.scryfall_id}>
              <Card border="dark" bg="dark">
                <img alt="card title" className="cardImg" src={card.imageNormal} />
                {/* <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                </Card.Body> */}
                <Card.Body>
                <>
              <style type="text/css">
                {`
                  .btn-addGive {
                  background-color: #303841;
                  color: #FF5722;
                  cursor: pointer;
                  border: 2px solid #FF5722;
                  margin-right: 2%;
                  } 
                  .btn-addGive:hover {
                  color: #FF5722;
                  border: 2px solid #FF5722;
                  box-shadow: inset 0px 0px 8px #FF5722, 0 0 15px #FF5722;
                  }
                `}
              </style>
              <Button type="submit" variant="addGive" size="md">
                Give Card
              </Button>
            </>

            <>
              <style type="text/css">
                {`
                  .btn-addReceive {
                  background-color: #303841;
                  color: #00ADB5;
                  cursor: pointer;
                  border: 2px solid #00ADB5;
                  margin-left: 2%;
                  } 
                  .btn-addReceive:hover {
                  color: #00ADB5;
                  border: 2px solid #00ADB5;
                  box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                  }
                `}
              </style>
              <Button type="submit" variant="addReceive" size="md">
                Receive Card
              </Button>
            </>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
  </div>
</Container>
  );
}

export default Evaluate;
