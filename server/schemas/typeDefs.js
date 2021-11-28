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
    seen: Boolean
  }

  type Post {
    _id: ID
    title: String
    content: String
    announcement: Boolean
    user: User
    whatGym: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    content: String
    likes: [User]
    user: User
    username: String
    post: Post
  }

  type Auth {
    token: ID
    user: User
  }

  type File {
    filename: String!
    mimetype: String!
    path: String!
  }

  type Query {
    user: User
    getUserById(_id: ID!): User
    getAllPosts: [Post]
    getPostById(_id: ID!): Post
    getPostByGym(whatGym:String!): [Post]
    getComments: [Comment]
    getMessageThread(_id: ID!): MessageThread
    files: [File!]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      administrator: Boolean!
      password: String!
      beltColor: String!
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
      comments: [ID]
    ): Post

    editExistingPost(
      _id: ID!
      title: String
      content: String
      announcement: Boolean
      whatGym: String
    ): Post

    addNewComment(
      content: String!
      likes: [ID]
      user: ID
      username: String
      post: ID!
    ): Comment

    addNewMessageThread(
      _id: ID
      content: [ID]
      users:[ID]
    ): MessageThread

    addNewMessage(
      _id: ID
      content: String!
      user: ID!
      seen: Boolean
    ): MessageThread

    uploadFile(file: Upload!): File

    login(email: String!, password: String!): Auth
  }

  type UploadedFileResponse {
      filename: String!
      mimetype: String!
      encoding: String!
      url: String!
    }
`;

module.exports = typeDefs;
