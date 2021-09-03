const { gql } = require("apollo-server-express");


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    administrator: Boolean
    email: String
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    content: String
    announcement: Boolean
    user: User
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    getAllPosts: [Post]
    getPostById(_id: ID!): Post
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      administrator: Boolean!
      password: String!
    ): Auth

    editUser(
      username: String
      email: String
      administrator: Boolean
      password: String
    ): Auth

    addNewPost(
      title: String!
      content: String!
      announcement: Boolean!
    ): Post

    editExistingPost(
      _id: ID!
      title: String
      content: String
      announcement: Boolean
    ): Post

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
