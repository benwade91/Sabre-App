import React, { useState } from 'react'
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_POSTS, QUERY_USER_BY_USERNAME } from '../../utils/queries'
import { useHistory } from 'react-router-dom'

const CommentInput = ({
  _id,
  comments,
  tempString,
  error,
  setError,
  userSearch,
  setUserSearch,
  setUsersReferenced,
  chat,
  setChat,
  setCommentState,
  createComment,
  Auth,
}) => {
  const [commentState] = useState('')
  const [usersReferenced] = useState([])
  const history = useHistory()
  const [commentsVisible] = useState(false)

  const { loading, error: error1, data, refetch } = useQuery(
    QUERY_USER_BY_USERNAME,
    {
      variables: { username: userSearch },
      onCompleted: (data) => {
        data.getUserByUsername &&
          usersReferenced.indexOf(data.getUserByUsername) === -1 &&
          setUsersReferenced([...usersReferenced, data.getUserByUsername])
      },
    },
  )

  loading && console.log(loading)
  error1 && console.log(error1)
  data && console.log(data)

  const handleChange = (event) => {
    let taggedUsers = [...event.target.value.matchAll(/^@?(\w){1,15}$/g)]
    taggedUsers &&
      taggedUsers.forEach((user) => {
        setUserSearch(user[0])
        refetch()
      })
    setCommentState(event.target.value)
  }
  const handleCommentSubmit = () => {
    if (commentState === '') {
      setError(true)
    } else if (!Auth.loggedIn()) {
      history.push('/login')
    } else {
      createComment({
        variables: {
          content: tempString,
          post: _id,
        },
        refetchQueries: [{ query: QUERY_ALL_POSTS }],
      })
      setCommentState('')
      setError(false)
    }
  }

  const handleSelect = (e) => {
    // e.target.style.height = 'inherit';
    // e.target.className += ' here';
    // console.log(e.target.className);
    // e.target.style.height = `${e.target.scrollHeight}px`;
    setChat(true)
  }
  const handleBlur = (e) => {
    e.target.style.height = '9vh'
  }

  return (
    <div>
      <Form className="m-1">
        {error && (
          <Alert className="alertBox" show={true} variant="danger">
            <p className="m-auto">You gotta write something foo</p>
          </Alert>
        )}
        {Auth.loggedIn() && comments.length === 0 ? (
          <FloatingLabel controlId="floatingTextarea2" label="Comment">
            <Form.Control
              as="textarea"
              placeholder="Comment"
              style={{
                height: '9vh',
                width: '99%',
              }}
              onSelect={handleSelect}
              onBlur={handleBlur}
              onChange={handleChange}
              value={commentState}
              className="m-1"
            />
          </FloatingLabel>
        ) : (
          commentsVisible && (
            <FloatingLabel controlId="floatingTextarea2" label="Comment">
              <Form.Control
                as="textarea"
                placeholder="Comment"
                style={{
                  height: '9vh',
                  width: '99%',
                }}
                onSelect={handleSelect}
                onBlur={handleBlur}
                onChange={handleChange}
                value={commentState}
                className="m-1"
              />
            </FloatingLabel>
          )
        )}

        {chat && (
          <Button onClick={handleCommentSubmit} variant="primary" type="button">
            Comment
          </Button>
        )}
      </Form>
    </div>
  )
}
export default CommentInput
