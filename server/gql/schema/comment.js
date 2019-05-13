const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    comments: [Comment!]!
  }
  extend type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
  }
  extend type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  input CreateCommentInput {
    text: String!
    author: ID!
    postId: ID!
  }
  input UpdateCommentInput {
    text: String
  }
  enum CommentMutationType {
    CREATE
    DELETE
    UPDATE
  }
  type CommentSubscriptionPayload {
    mutation: CommentMutationType!
    data: Comment!
  }
`;
