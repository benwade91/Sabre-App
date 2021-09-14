const { gql } = require("apollo-server-express");


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    administrator: Boolean
    email: String
    posts: [Post]
    privateMessages: [Message]
    beltColor: String
  }

  type MessageThread {
    _id: ID
    content: [Message]
    users: [User]
  }

  type Message {
    _id: ID
    content: String
    user: User
  }

  type Post {
    _id: ID
    title: String
    content: String
    announcement: Boolean
    user: User
    whatGym: String
  }

  type Comment {
    _id: ID
    content: String
    likes: [User]
    user: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    getUserById(_id: ID!): User
    getAllPosts: [Post]
    getPostById(_id: ID!): Post
    getPostByGym(whatGym:String!): [Post]
    getComments: [Comment!]
    getMessageThread(_id: ID!): MessageThread
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
      whatGym: String!
    ): Post

    editExistingPost(
      _id: ID!
      title: String
      content: String
      announcement: Boolean
      whatGym: String
    ): Post

    addNewMessageThread(
      _id: ID
      content: [ID]
      users:[ID]
    ): MessageThread

    addNewMessage(
      _id: ID
      content: String!
      user: ID!
    ): MessageThread

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
