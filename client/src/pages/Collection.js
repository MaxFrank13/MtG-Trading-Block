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

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CARD, REMOVE_CARD } from "../utils/mutations";
import { GET_ME } from '../utils/queries';

import Auth from "../utils/auth";
import { saveCardIds, getSavedCardIds, removeCardId } from "../utils/localStorage";


import { autocomplete } from '../utils/autocomplete';
import { AutocompleteBox } from "../components/AutocompleteBox";


function Collection() {

  const { loading, data } = useQuery(GET_ME);

  const [userData, setUserData] = useState(data?.me || {});
  
  // useEffect that fires as soon as the data comes in from the GQL request
  // sets userData to the response from the request
  useEffect(() => {
    
    const user = data?.me || {};
    
    console.log(user);
    
    setUserData(user);
    
  }, [data]);
  
  
  const [searchedCards, setSearchedCards] = useState([]);
  const [autoCompleteArray, setAutoCompleteArray] = useState([]);
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());
  
  const [searchInput, setSearchInput] = useState('');
  const [cardNotFound, setCardNotFound] = useState(false);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [updatedCollectionAlert, setUpdatedCollectionAlert] = useState(false);
  
  
  const [addCard, addCardData] = useMutation(ADD_CARD);
  const [removeCard, removeCardData] = useMutation(REMOVE_CARD);
  
  useEffect(() => {
    return () => saveCardIds(savedCardIds);
  });

  useEffect(() => {
    if (triggerSubmit) {
      handleFormSubmit();
      setTriggerSubmit(false);
    }
  }, [triggerSubmit]);

  useEffect(() => {
    setTimeout(() => {
      setUpdatedCollectionAlert(false);
    }, 1500)
  }, [userData])

  const handleFormSubmit = async (event) => {
    event?.preventDefault();

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
        price: parseFloat(card.prices.usd)
      }));

      setSearchedCards(cardData);
      setSearchInput('');
      setAutoCompleteArray([]);
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
      setUpdatedCollectionAlert(true);
      setSavedCardIds([...savedCardIds, cardToAdd._id]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCard = async (e) => {
    const _id = e.target.dataset.id;
    console.log(_id);
    try {
      const { data } = await removeCard({
        variables: {
          _id: _id,
        }
      });

      if (!data) {
        throw new Error('Unable to remove card');
      };
      removeCardId(_id);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  const handleSearchInput = async (e) => {
    const queryString = e.target.value;
    setSearchInput(queryString);

    if (queryString.length > 2) {
      console.log('here');
      const data = await autocomplete(queryString);
      setAutoCompleteArray(data);
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
        {updatedCollectionAlert && (
          <h4 className="updated-collection-alert">updated collection!</h4>
        )}

        <Row xs={1} md={2} lg={3} className="g-4">
          {loading ? (
            <h1 className="mx-auto">loading collection...</h1>
          ) : (
            <>
              {userData?.binder?.map((card) => {
                return (
                  <Col key={card._id}>
                    <Card border="dark" bg="dark">
                      {card.imageNormal ? (
                        <img src={card.imageNormal} alt={`Image of ${card.name}`} variant="top" className="cardImg" />
                      ) : null}
                      <Card.Body>
                        <>
                          <style type="text/css">
                            {`
                          .btn-removeCard {
                          background-color: #303841;
                          color: #FF5722;
                          cursor: pointer;
                          border: 2px solid #FF5722;
                          } 
                          .btn-removeCard:hover {
                          color: #FF5722;
                          border: 2px solid #FF5722;
                          box-shadow: inset 0px 0px 8px #FF5722, 0 0 15px #FF5722;
                          }
                        `}
                          </style>
                          {Auth.loggedIn() && (
                            <Button
                              type="submit"
                              variant="removeCard"
                              size="sm"
                              data-id={card._id}
                              onClick={handleRemoveCard}
                            >
                              Remove
                            </Button>
                          )}
                        </>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </>
          )}

        </Row>

        <Row className="collectionSearch">
          <Col>
            <Form className="d-flex" onSubmit={handleFormSubmit}>
              <FormControl
                value={searchInput}
                onChange={handleSearchInput}
                type="search"
                placeholder="Find Cards To Add"
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
          <AutocompleteBox
            cards={autoCompleteArray}
            setSearchInput={setSearchInput}
            setTriggerSubmit={setTriggerSubmit}
          />
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {searchedCards.map((card) => {
            return (
              <Col key={card.cardId}>
                <Card border="dark" bg="dark">
                  {card.imageNormal ? (
                    <img src={card.imageNormal} alt={`Image of ${card.name}`} variant="top" className="cardImg" />
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
                          } 
                          .btn-addCard:hover {
                          color: #00ADB5;
                          border: 2px solid #00ADB5;
                          box-shadow: inset 0px 0px 8px #00ADB5, 0 0 15px #00ADB5;
                          }
                        `}
                      </style>
                      {Auth.loggedIn() && (
                        <Button
                          type="submit"
                          variant="addCard"
                          size="sm"
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

      {addCardData.error && (
        <div className="my-3 p-3 bg-danger text-white">
          {addCardData.error.message}
        </div>
      )}
      {removeCardData.error && (
        <div className="my-3 p-3 bg-danger text-white">
          {removeCardData.error.message}
        </div>
      )}
    </div>
  );
}

export default Collection;
