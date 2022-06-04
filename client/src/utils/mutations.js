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
  mutation removeCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
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

export const ADD_CHAT = gql`
  mutation addChat($inviteEmail: String!) {
    addChat(inviteEmail: $inviteEmail) {
      _id
      users {
        username
        _id
        email
        binder {
          name
        }
      }
      userCount
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation Mutation($chat_id: ID!, $createdAt: String!, $content: String!, $username: String!) {
    addMessage(chat_id: $chat_id, createdAt: $createdAt, content: $content, username: $username) {
      _id
    }
  }
`;
