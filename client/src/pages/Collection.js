import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../utils/mutations";

import Auth from "../utils/auth";
import { saveCardIds, getSavedCardIds } from "../utils/localStorage";

function Collection() {
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());

  const [addCard, { error }] = useMutation(ADD_CARD);

  useEffect(() => {
    return () => saveCardIds(savedCardIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchInput}&unique=prints`);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { data } = await response.json();

      const cardData = data.map((card) => ({
        cardId: card.id,
        name: card.name,
        imageSmall: card.card_faces ? card.card_faces[0].image_uris.small : card.image_uris?.small || "",
        imageNormal: card.card_faces ? card.card_faces[0].image_uris.normal : card.image_uris?.normal || "",
        price: parseFloat(card.prices.usd)
      }));

      setSearchedCards(cardData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCard = async (cardId) => {
    const cardToAdd = searchedCards.find((card) => card.cardId === cardId);
    console.log(cardToAdd);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addCard({
        variables: { input: { ...cardToAdd } }
      })

      if (!data) {
        throw new Error('something went wrong!');
      }
      console.log(data);

      setSavedCardIds([...savedCardIds, cardToAdd.cardId]);
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
        <Row className="search">
          <Col>
            <Form className="d-flex" onSubmit={handleFormSubmit}>
              <FormControl
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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
                    box-shadow: inset 0px 0p#00ADB5, 0 0 15px #00ADB5;
                    color: #00ADB5;
                    }
                  `}
                </style>
                <Button type="submit" variant="search" size="lg">
                  Search
                </Button>
              </>
            </Form>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {searchedCards.map((card) => {
            return (
              <Col key={card.cardId}>
                <Card>
                  {card.imageNormal ? (
                    <Card.Img src={card.imageNormal} alt={`Image of ${card.name}`} variant="top" />
                  ) : null}
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
                      {Auth.loggedIn() && (
                        <Button
                          type="submit"
                          variant="addCard"
                          size="lg"
                          onClick={() => handleAddCard(card.cardId)}>
                            Add to Collection
                        </Button>
                      )}
                    </>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default Collection;
