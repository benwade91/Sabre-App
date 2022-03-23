const {
  gql
} = require("apollo-server-express");


const typeDefs = gql `

  type User {
    _id: ID
    username: String
    administrator: Boolean
    email: String
    whatGym: String
    posts: [Post]
    privateMessages: [Message]
    beltColor: String
    checkIn:[CheckIn]
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
    photoID: [String]
    announcement: Boolean
    user: User
    whatGym: String
    comments: [Comment]
    viewedBy: [String]
    youtubeLink: String
    date: String
  }

  type Comment {
    _id: ID
    content: String
    likes: [User]
    user: User
    username: String
    post: Post
    date: String
  }

  type Auth {
    token: ID
    user: User
  }

  type CheckIn {
    _id: ID
    gym: String
    user: User
    date: String
  }

  type Query {
    user: User
    getUserByUsername(username: String!): User
    getUserById(_id: ID!): User
    getAllPosts: [Post]
    getPostById(_id: ID!): Post
    getPostByGym(whatGym:String!): [Post]
    getComments: [Comment]
    getMessageThread(_id: ID!): MessageThread
    getCheckIn: [CheckIn]
  }

  type Mutation {

    addUser(
      username: String!
      email: String!
      whatGym: String
      administrator: Boolean!
      password: String!
      beltColor: String!
    ): Auth

    editUser(
      username: String
      email: String
      whatGym: String
      administrator: Boolean
      password: String
    ): Auth

    addNewPost(
      title: String
      content: String!
      photoID: [String]
      announcement: Boolean!
      whatGym: String!
      comments: [ID]
      viewedBy: [String]
      youtubeLink: String
    ): Post

    addCheckIn(
      gym: String!
      user: ID!
    ): CheckIn

    editExistingPost(
      _id: ID!
      viewedBy: [String]
    ): Post

    deletePost(_id: ID!):Post

    addNewComment(
      content: String!
      likes: [ID]
      user: ID
      username: String
      post: ID!
    ): Comment

    deleteComment(
      post: ID!
      _id: ID!
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

    helpMessage(
      user: String
      email: String
      helpWith: String
      content: String
    ): String

    login(email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;