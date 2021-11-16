const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Box {
    _id: ID
    packingDate: String
    name: String
    description: String
    images: [String]
    isMoving: Boolean!
    isFragile: Boolean!
    price: Float
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    boxes: [Box]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    getUserBoxes(userId: ID!): [Box]
    singleBox(boxId: ID!): Box
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addBox(
      packingDate: String
      name: String!
      description: String
      images: [String]
      price: Float
      isMoving: Boolean!
      isFragile: Boolean!
      userId: ID!
    ): Box
    updateBox(
      packingDate: String
      name: String
      description: String
      images: [String]
      price: Float
      isMoving: Boolean!
      isFragile: Boolean!
      userId: ID!
    ): Box
  }
`;

module.exports = typeDefs;
