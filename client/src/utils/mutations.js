import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($input: CardInput) {
    addCard(input: $input) {
      _id
      username
      email
      binder {
        cardId
        name
        imageNormal
        imageSmall
        price
      }
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation removeCard($_id: ID!) {
    removeCard(_id: $_id) {
      _id
      username
      email
      binder {
        _id
      }
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($username: String!) {
    addChat(username: $username) {
      _id
      users {
        _id
        username
        email
        binder {
          cardId
          name
          imageNormal
          imageSmall
          price
        }
      }
      messages {
        _id
        chat_id
        username
        content
        createdAt
      }
      userCount
      messageCount
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chat_id: ID!, $content: String!, $username: String!) {
    addMessage(chat_id: $chat_id, content: $content, username: $username) {
      _id
      chat_id
      username
      content
      createdAt
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($content: String!) {
    addPost(content: $content) {
      _id
      content
      user {
        username
        email
      }
      createdAt
    }
  }
`;
