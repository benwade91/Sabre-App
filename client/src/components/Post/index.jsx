import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Comment } from '../Comment'
import { Image } from 'cloudinary-react'
import './style.css'
import { DELETE_POST, EDIT_POST } from '../../utils/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ALL_POSTS } from '../../utils/queries'
import ReactHtmlParser from 'react-html-parser'
import { useHistory } from 'react-router-dom'
import CommentInput from '../CommentInput'
import Auth from '../../utils/auth';

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

  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [imageProps, setImageProps] = useState(true)
  const { data: userData } = useQuery(QUERY_USER)
  const [editPost] = useMutation(EDIT_POST)
  const [deletePost] = useMutation(DELETE_POST)
  const history = useHistory()

  const isUsersPost = () => {
    return user._id === userData.user._id
  }

  const handleUserClick = (id) => {
    history.push({
      pathname: `/user/${id}`,
    })
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
    let obj;
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
          {/* CONDITIONALLY RENDERS PHOTOS */}
          {photoID.length > 0 && (
            <div className={imageProps ? 'postImgSmBg' : 'postImgBigBg'}>
              {photoID.map((imgId, key) => (
                <Image
                  key={key}
                  onClick={() => setImageProps(!imageProps)}
                  className={imageProps ? 'postImg mx-auto' : 'postImgBig'}
                  cloudName={'benwade'}
                  publicId={imgId}
                ></Image>
              ))}
            </div>
          )}

          {comments.length > 0 && !commentsVisible && (
            <Button
              className="mt-3"
              onClick={() => setCommentsVisible(true)}
              variant="outline-secondary"
              size="sm"
            >
              {comments.length > 1
                ? `${comments.length} Comments`
                : '1 Comment'}
            </Button>
          )}
          {commentsVisible &&
            comments.map((comment, index) => (
              <Comment key={index} user={user} props={comment} postId={_id} />
            ))}
        </Card.Body>

        {/* INPUT AREA FOR COMMENTS */}
        {Auth.loggedIn() && <CommentInput props={{ _id, comments, commentsVisible }} />}

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
