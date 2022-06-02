const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    binder: [Card]
  }

  type Card {
    scryfall_id: ID!
    name: String!
    imageNormal: String!
    imageSmall: String!
  }

  type Chat {
    _id: ID!
    users: [User]
    messages: [Message]
  }

  type Message {
    _id: ID!
    user: User
    content: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addChat(currentEmail: String!, inviteEmail: String!) : Chat
  }
`;

module.exports = typeDefs;
