const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users(query: String): [User!]!
    me: User!
  }
  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }
  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }
`;
