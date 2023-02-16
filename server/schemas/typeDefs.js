const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    gallery: [Art]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Art {
    _id: ID
    artId: Int
    artTitle: String
    artImage: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    gallery(username: String): [Art]
    singleart(aId: ID!): Art
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addArt(artId: Int!, artTitle: String!, artImage: String): Art
    addComment(thoughtId: ID!, commentText: String!): Thought
    addArtComment(aId: ID!, commentText: String!): Art
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    removeArt(aId: ID!): Art
    removeArtComment(aId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;
