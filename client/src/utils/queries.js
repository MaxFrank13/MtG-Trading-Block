import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

export const GET_USERS = gql`
  query users {
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
  }
`;

export const GET_CHATS = gql`
  query myChats {
    myChats {
      _id
      messages {
        _id
        chat_id
        username
        content
        createdAt
      }
      userCount
      messageCount
      users {
        _id
        username
        email
      }
    }
  }
`;
