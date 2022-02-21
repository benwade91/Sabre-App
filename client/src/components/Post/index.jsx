import React, { useState, useEffect } from 'react';
import { Card, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { Comment } from '../Comment';
import { Image } from 'cloudinary-react';
import './style.css';
import { ADD_COMMENT, DELETE_POST, EDIT_POST } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import {
  QUERY_USER,
  QUERY_ALL_POSTS,
  QUERY_USER_BY_USERNAME,
} from '../../utils/queries';
import ReactHtmlParser from 'react-html-parser';
import Auth from '../../utils/auth';
import { useHistory } from 'react-router-dom';

const Post = (props) => {
  const {
    content,
    user,
    whatGym,
    comments,
    photoID,
    _id,
    viewedBy,
  } = props.props
  const [tempString, setTempString] = useState('')
  const [error, setError] = useState(undefined)
  const [userSearch, setUserSearch] = useState('')
  const [usersReferenced, setUsersReferenced] = useState([])
  const [chat, setChat] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [commentState, setCommentState] = useState('')
  const [imageProps, setImageProps] = useState(true)
  const { data: userData } = useQuery(QUERY_USER)
  const [createComment] = useMutation(ADD_COMMENT)
  const [editPost] = useMutation(EDIT_POST)
  const [deletePost] = useMutation(DELETE_POST)
  const history = useHistory()

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

  const isUsersPost = () => {
    return user._id === userData.user._id
  }

  const handleChange = (event) => {
    let taggedUsers = [...event.target.value.matchAll(/(?<=@)(\w{1,15})\b/g)]
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

  const handleUserClick = (id) => {
    history.push({
      pathname: `/user/${id}`,
    })
  }

  const handleBlur = (e) => {
    e.target.style.height = '9vh'
  }

  const handleDelete = () => {
    deletePost({
      variables: {
        _id: _id,
      },
      refetchQueries: [{ query: QUERY_ALL_POSTS }],
    })
    setShowDeleteAlert(false)
  }

  useEffect(() => {
    let obj
    userData && (obj = viewedBy.find((x) => x === userData.user._id))
    if (!obj) {
      userData &&
        editPost({
          variables: {
            _id: _id,
            viewedBy: [...viewedBy, userData.user._id],
          },
          refetchQueries: [{ query: QUERY_ALL_POSTS }],
        })
    }
  }, [userData, _id, editPost, viewedBy])

  useEffect(() => {
    // console.log(usersReferenced)
    let temp = commentState
    usersReferenced.forEach((user_) => {
      console.log(user_)
      // setTempString(commentState.replace(`@${usersReferenced[userR].username}`, `<a href="/user/${usersReferenced[userR]._id}" className="userReference">@${usersReferenced[userR].username}</a>`))
      temp = temp.replace(`@${user_.username}`, `<a href="/user/${user_._id}">@${user_.username}</a>`)
    })
    setTempString(temp)
  }, [commentState])

  return (
    <>
      <Card className="m-1">
        <Card.Header as="h5">
          <span onClick={() => handleUserClick(user._id)}>{user.username}</span>
          <div className="cardHead">
            <Card.Text>
              <small className="text-muted">{whatGym}</small>
            </Card.Text>
            {userData && isUsersPost() && (
              <Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowDeleteAlert(true)}
                  size="sm"
                >
                  Remove
                </Button>
              </Card.Text>
            )}
          </div>
        </Card.Header>

        <Card.Body>
          <Card.Text className={photoID ? 'cardContent mb-5' : 'mb-3'}>
            {ReactHtmlParser(content)}
          </Card.Text>
          {/* CONDITIONALLY RENDERS YOUTUBE VIDEOS */}
          {/* {youtubeLink && youtubeLink !== '' &&
                    <iframe width="100%" src={`https://www.youtube.com/embed/${youtubeLink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>} */}

          {/* CONDITIONALLY RENDERS PHOTOS */}
          <div className={imageProps ? 'postImgSmBg' : 'postImgBigBg'}>
            {photoID &&
              photoID.map((imgId, key) => (
                <Image
                  key={key}
                  onClick={() => setImageProps(!imageProps)}
                  className={imageProps ? 'postImg mx-auto' : 'postImgBig'}
                  cloudName={'benwade'}
                  publicId={imgId}
                ></Image>
              ))}
          </div>

          {comments.length > 0 && !commentsVisible && (
            <Button
              className="mt-3"
              onClick={() => setCommentsVisible(true)}
              variant="outline-secondary"
              size="sm"
            >
              {comments.length} Comments
            </Button>
          )}
          {commentsVisible &&
            comments.map((comment, index) => (
              <Comment key={index} user={user} props={comment} postId={_id} />
            ))}
        </Card.Body>

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
            <Button
              onClick={handleCommentSubmit}
              variant="primary"
              type="button"
            >
              Comment
            </Button>
          )}
        </Form>
      </Card>

      {showDeleteAlert && (
        <div className="alertBackground">
          <Alert className="alertBox" show={true} variant="danger">
            <Alert.Heading>Are you sure?</Alert.Heading>
            <p>Its gonna be gone forever and you'll never see it again</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleDelete}
                className="me-auto"
                variant="outline-danger"
              >
                I'm Sure!
              </Button>
              <Button
                onClick={() => setShowDeleteAlert(!showDeleteAlert)}
                variant="success"
              >
                Nevermind!
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  )
}

export default Post
