const { gql } = require("apollo-server-express");


const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    content: String
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
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    editUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): Auth

    addNewPost(
      title: String!
      content: String!
    ): Post

    editExistingPost(
      _id: ID!
      title: String
      content: String
    ): Post

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
