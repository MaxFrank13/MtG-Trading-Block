const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input CardInput {
    cardId: ID!
    name: String!
    imageNormal: String
    imageSmall: String
    price: Float
  }

  type User {
    _id: ID
    username: String!
    email: String!
    binder: [Card]
  }

  type Card {
    cardId: ID!
    name: String!
    imageNormal: String
    imageSmall: String
    price: Float
  }

  type Chat {
    _id: ID!
    users: [User]
    messages: [Message]
    userCount: Int
    messageCount: Int
  }

  type Message {
    _id: ID!
    chat_id: ID
    username: String!
    content: String!
    createdAt: String!
  }

  type TradePost {
    user: User
    createdAt: String!
    content: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    myChats: [Chat]
    getPosts: [TradePost]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addCard(input: CardInput): User
    removeCard(cardId: ID!): User
    addChat(inviteEmail: String!) : Chat
    addMessage(chat_id: ID!, username: String!, content: String!) : Message
  }
`;

module.exports = typeDefs;
