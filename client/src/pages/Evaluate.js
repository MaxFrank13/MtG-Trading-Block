import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";

function Evaluate() {
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [cardNotFound, setCardNotFound] = useState(false);
  const [cardsToGive, setCardsToGive] = useState([]);
  const [cardsToGiveTotal, setCardsToGiveTotal] = useState(0);
  const [cardsToReceive, setCardsToReceive] = useState([]);
  const [cardsToReceiveTotal, setCardsToReceiveTotal] = useState(0);

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
        cardId: card.id,
        name: card.name,
        imageSmall: card.card_faces ? card.card_faces[0].image_uris?.small : card.image_uris?.small || "",
        imageNormal: card.card_faces ? card.card_faces[0].image_uris?.normal : card.image_uris?.normal || "",
        price: parseFloat(card.prices.usd) ||0
      }));

      setSearchedCards(cardData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCardToGive = (e) => {
    const card = {...JSON.parse(e.target.dataset.card), evaluatorId: uuidv4()};
    setCardsToGive([...cardsToGive, card]);
    setCardsToGiveTotal(cardsToGiveTotal + card.price);
  };

  const handleAddCardToReceive = (e) => {
    const card = {...JSON.parse(e.target.dataset.card), evaluatorId: uuidv4()};
    setCardsToReceive([...cardsToReceive, card]);
    setCardsToReceiveTotal(cardsToReceiveTotal + card.price);
  };

  const handleRemoveCardToGive = (e) => {
    console.log(e);
    setCardsToGiveTotal(cardsToGiveTotal - e.target.dataset.price);
    setCardsToGive(cardsToGive.filter(card => card.evaluatorId !== e.target.dataset.id));
  };

  const handleRemoveCardToReceive = (e) => {
    console.log(e);
    setCardsToReceiveTotal(cardsToReceiveTotal - e.target.dataset.price);
    setCardsToReceive(cardsToReceive.filter(card => card.evaluatorId !== e.target.dataset.id));
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
              <h4 className="cards-total">${cardsToGiveTotal.toFixed(2)}</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox text-center">
            {cardsToGive.map((card) => {
              return (
                <Col key={card.evaluatorId}>
                  <Card border="dark" bg="dark">
                    {card.imageNormal ? (
                      <img src={card.imageNormal} alt={card.name} variant="top" className="cardImg" />
                    ) : null}
                    <Card.Body>
                      <p className="card-price">${card.price.toFixed(2)}</p>
                      <>
                        <style type="text/css">
                          {`
                            .btn-addRemove {
                            background-color: #303841;
                            color: #00ADB5;
                            cursor: pointer;
                            border: 2px solid #00ADB5;
                            margin-left: 2%;
                            } 
                            .btn-addRemove:hover {
                            color: #00ADB5;
                            border: 2px solid #00ADB5;
                            box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                            }
                          `}
                        </style>
                        <Button type="submit" variant="addRemove" size="md"
                        data-id={card.evaluatorId}
                        data-price={card.price}
                        onClick={handleRemoveCardToGive}>
                          Remove
                        </Button>
                      </>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col className="bar" xs="auto">
        </Col>

        <Col>
          <h2 className="text-center receiveH2">Cards To Receive</h2>
          <Row className="valRow">
            <Col className="backDropTv text-center">
              <h4 className="cards-total">${cardsToReceiveTotal.toFixed(2)}</h4>
            </Col>
          </Row>
          <Row xs={2} lg={3} className="g-4 tradeBox text-center">
            {cardsToReceive.map((card) => {
              return (
                <Col key={card.evaluatorId}>
                  <Card border="dark" bg="dark">
                    {card.imageNormal ? (
                      <img src={card.imageNormal} alt={card.name} variant="top" className="cardImg" />
                    ) : null}
                    <Card.Body>
                      <p className="card-price">${card.price.toFixed(2)}</p>
                      <>
                        <style type="text/css">
                          {`
                            .btn-addRemove {
                            background-color: #303841;
                            color: #00ADB5;
                            cursor: pointer;
                            border: 2px solid #00ADB5;
                            margin-left: 2%;
                            } 
                            .btn-addRemove:hover {
                            color: #00ADB5;
                            border: 2px solid #00ADB5;
                            box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                            }
                          `}
                        </style>
                        <Button type="submit" variant="addRemove" size="md"
                        data-id={card.evaluatorId}
                        data-price={card.price}
                        onClick={handleRemoveCardToReceive}>
                          Remove
                        </Button>
                      </>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
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
              <Col key={card.cardId}>
                <Card border="dark" bg="dark">
                  {card.imageNormal ? (
                    <img src={card.imageNormal} alt={card.name} variant="top" className="cardImg" />
                  ) : null}
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
                      <Button data-card={JSON.stringify(card)} type="submit" variant="addGive" size="md" onClick={handleAddCardToGive}>
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
                      <Button data-card={JSON.stringify(card)} type="submit" variant="addReceive" size="md" onClick={handleAddCardToReceive}>
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
