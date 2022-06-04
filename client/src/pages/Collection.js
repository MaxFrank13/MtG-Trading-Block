import React, { useState } from "react";

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
    <div className="backDrop text-center">
      <Container fluid="md">
        <Row>
          <Col>
            <h3>My Collection</h3>
          </Col>
        </Row>
        <Row xs={2} lg={3} className="g-4 searchBox text-center">
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
                    .btn-addCard {
                    background-color: #303841;
                    color: #00ADB5;
                    cursor: pointer;
                    border: 2px solid #00ADB5;
                    margin-right: 5%;
                    } 
                    .btn-addCard:hover {
                    color: #FF5722;
                    border: 2px solid #FF5722;
                    }
                  `}
                </style>
                <Button type="submit" variant="addCard" size="lg">
                  Add To Collection
                </Button>
              </>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Collection;
