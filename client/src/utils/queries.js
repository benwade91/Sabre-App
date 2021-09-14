import gql from "graphql-tag";

export const QUERY_USER = gql `
  {
    user{
      _id
      username
      administrator
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
  title
  content
  announcement
  whatGym
  user{
    _id
    username
  }
}
}
`;