import gql from "graphql-tag";

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        administrator
        beltColor
        email
        posts{
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser(
    $username: String!
    $administrator: Boolean!
    $beltColor: String!
    $email: String!
    $whatGym: String!
    $password: String!
  ) {
    addUser(
      username: $username
      administrator: $administrator
      beltColor: $beltColor
      whatGym: $whatGym
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation addNewPost(
  $title: String
  $content: String!
  $photoID: [String]
  $announcement: Boolean!
  $whatGym:String!
){
  addNewPost(
    title: $title
    content:$content
    photoID: $photoID
    announcement:$announcement
    whatGym:$whatGym
  ){
    _id
    title
    content
    user{
      _id
    }
  }
}
`;

export const EDIT_POST = gql`
mutation editExistingPost(
  $_id: ID!
  $viewedBy:[ID]
){
  editExistingPost(
    _id: $_id
    viewedBy: $viewedBy
  ){
    _id
    title
    content
    photoID
    announcement
    whatGym
    viewedBy{
      _id
    }
    user{
      _id
    }
  }
}
`;

export const DELETE_POST = gql`
mutation deletePost($_id:ID!){
  deletePost(_id:$_id){
    _id
    user{
      _id
      username
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addNewComment(
  $content: String!
  $likes: [ID]
  $post:ID!
){
  addNewComment(
    content:$content
    likes:$likes
    post:$post
  ){
    _id
    content
    user{
      _id
      username
    }
  }
}
`;