import React, { useState, useEffect } from "react";

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

import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { GET_POSTS } from "../utils/queries";

function TradeBlock() {

  // User information being fetched from GQL and set as a state variable
  const { loading, data } = useQuery(GET_POSTS);

  const [postData, setPostData] = useState(data?.getPosts || []);

  // useEffect that fires as soon as the data comes in from the GQL request
  // sets userData to the response from the request
  useEffect(() => {

    const posts = data?.getPosts || [];

    console.log(posts);

    setPostData(posts);

  }, [data]);

  const [tradePostInputValue, setTradePostInputValue] = useState('');

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleInputChange = (e) => {
    setTradePostInputValue(e.target.value);
  };

  const handlePostAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addPost({
        variables: { 
          content: tradePostInputValue
        }
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

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
              {postData?.map(post => (
                <div className="trade-post">
                  <h5>{post.user.username}</h5>
                  <p>{post.content}</p>
                  <small>{post.createdAt}</small>
                </div>
              ))}
            </>
          </Col>
        </Row>
        <Row className="post">
          <Col>
            <Form 
              onSubmit={handlePostAdd} 
              className="d-flex"
            >
              <FormControl
                type="text"
                placeholder="Trade Message"
                className="me-2"
                aria-label="Post Trade"
                onChange={handleInputChange}
                value={tradePostInputValue}
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
                <Button 
                  variant="post" 
                  size="lg"
                  type="submit"
                >
                  Post
                </Button>
              </>
            </Form>
          </Col>
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

export default TradeBlock;
