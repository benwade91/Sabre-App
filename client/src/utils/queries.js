import gql from "graphql-tag";

export const QUERY_USER = gql `
  {
    user{
      _id
      username
      whatGym
      administrator
      beltColor
      email
      posts{
        _id
        title
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql `
{
  getAllPosts{
  _id
  title
  photoID
  content
  announcement
  whatGym
  viewedBy{
    _id
  }
  comments{
    content
    username
  }
  user{
    _id
    username
  }
}
}
`;

export const QUERY_USER_BY_ID = gql `
query getUserById($_id:ID!){
    getUserById(_id:$_id){
    username
    administrator
    beltColor
    whatGym
    email
    posts{
      _id
      title
    }
    _id
  }}
`;