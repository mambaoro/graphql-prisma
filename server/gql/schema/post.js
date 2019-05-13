const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    posts(query: String): [Post!]!
    post: Post!
  }
  extend type Mutation {
    createPost(input: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: updatePostInput!): Post!
  }
  extend type Subscription {
    post: PostSubscriptionPayload!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }
  input updatePostInput {
    title: String
    body: String
    published: Boolean
  }
  enum PostMutationType {
    CREATE
    DELETE
    UPDATE
  }
  type PostSubscriptionPayload {
    mutation: PostMutationType!
    data: Post!
  }
`;
