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

export const ADD_POST = gql `
mutation addNewPost(
  $title: String
  $content: String!
  $photoID: [String]
  $announcement: Boolean!
  $whatGym:String!
  $viewedBy: [String]
  $youtubeLink: String
){
  addNewPost(
    title: $title
    content:$content
    photoID: $photoID
    announcement:$announcement
    whatGym:$whatGym
    viewedBy: $viewedBy
    youtubeLink: $youtubeLink
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

export const EDIT_POST = gql `
mutation editExistingPost(
  $_id: ID!
  $viewedBy:[String]
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
    viewedBy
    user{
      _id
    }
  }
}
`;

export const DELETE_POST = gql `
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

export const ADD_CHECK_IN = gql `
mutation addCheckIn(
  $user: ID
  $gym: String
){
  addCheckIn(
    user:$user
    gym:$gym
  ){
    gym
    date
    user{
      _id
      username
    }
  }
}
`
export const ADD_COMMENT = gql `
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

export const HELP_MESSAGE = gql `
mutation helpMessage(
  $user: String
  $email: String
  $helpWith: String
  $content: String
){
  helpMessage(
    user: $user
    email: $email
    helpWith: $helpWith
    content: $content
  )
}
`;

export const DELETE_COMMENT = gql `
mutation deleteComment(
  $_id:ID!
  $post: ID!
  ){
  deleteComment(
    _id:$_id
    post: $post
    ){
    _id
  }
}
`;