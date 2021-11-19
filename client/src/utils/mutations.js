import gql from "graphql-tag";

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        administrator
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
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      administrator: $administrator
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
  $title: String!
  $content: String!
  $announcement: Boolean!
  $whatGym:String!
){
  addNewPost(
    title: $title
    content:$content
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