import gql from 'graphql-tag'

export const QUERY_USER = gql `
  {
    user {
      _id
      username
      whatGym
      administrator
      beltColor
      email
      posts {
        _id
        title
      }
    }
  }
`
export const QUERY_ALL_CHECKINS = gql `
{
  getCheckIn {
    _id
    gym 
    user {
      _id
      username
    }
    date 
  }
}
`

export const QUERY_ALL_POSTS = gql `
  {
    getAllPosts {
      _id
      title
      photoID
      content
      announcement
      whatGym
      viewedBy
      youtubeLink
      date
      comments {
        content
        username
        date
        user {
          _id
        }
        _id
      }
      user {
        _id
        username
      }
    }
  }
`

export const QUERY_USER_BY_USERNAME = gql `
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      username
      administrator
      posts {
        _id
        title
      }
      _id
    }
  }
`

export const QUERY_USER_BY_ID = gql `
  query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      username
      administrator
      beltColor
      whatGym
      email
      posts {
        _id
        title
        photoID
        content
        announcement
        whatGym
        viewedBy
        youtubeLink
        date
      }
      _id
    }
  }
`