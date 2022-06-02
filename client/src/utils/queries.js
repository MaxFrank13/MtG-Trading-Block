import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
      binder
    }
  }
`;