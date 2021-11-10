const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Box {
    _id: ID
    name: String
    description: String
    image: [String]
    quantity: Int
    price: Float
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    boxes:[Box]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    boxes: [Box]
    singleBox: Box
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
