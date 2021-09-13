import gql from "graphql-tag";

export const QUERY_USER = gql `
  {
    user {
      _id
      firstName
      lastName
      email
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
  }
}
}
`;