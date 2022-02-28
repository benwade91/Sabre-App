import React, { useState, useEffect } from 'react'
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { QUERY_ALL_POSTS, QUERY_USER_BY_USERNAME } from '../../utils/queries'
import { ADD_COMMENT} from '../../utils/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Auth from '../../utils/auth';

const CommentInput = (props) => {
    const {_id, comments, commentsVisible} = props.props;

  const [commentState, setCommentState] = useState('')
  const [tempString, setTempString] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [chat, setChat] = useState(false)
  const [usersReferenced, setUsersReferenced] = useState([])
  const [createComment] = useMutation(ADD_COMMENT)
  const history = useHistory()
  const [error, setError] = useState(undefined)

  const { refetch } = useQuery(
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
 

  const handleChange = (event) => {
    let taggedUsers = [...event.target.value.matchAll(/(^|[^@\w])@(\w{1,15})\b/g)]
    taggedUsers &&
      taggedUsers.forEach((user) => {
        setUserSearch(user[2])
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

  const handleSelect = () => {
    setChat(true)
  }

  const handleBlur = (e) => {
    e.target.style.height = '9vh'
  }

  useEffect(() => {
    let temp = commentState
    usersReferenced.forEach((user_) => {
      temp = temp.replace(
        `@${user_.username}`,
        `<a href="/user/${user_._id}">@${user_.username}</a>`,
      )
    })
    setTempString(temp)
  }, [commentState, usersReferenced])

  return (
    <div>
      <Form className="m-1">
        {error && (
          <Alert className="alertBox" show={true} variant="danger">
            <p className="m-auto">You gotta write something foo</p>
          </Alert>
        )}
        {Auth.loggedIn() && comments && comments.length === 0 ? (
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
