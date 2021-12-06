import React, { useState, useEffect } from 'react';
import { Card, Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { Comment } from '../Comment'
import { Image } from 'cloudinary-react';
import './style.css';
import { ADD_COMMENT, DELETE_POST, EDIT_POST } from '../../utils/mutations';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from '../../utils/queries';

const Post = (props) => {
    const { content, user, whatGym, comments, photoID, _id, viewedBy } = props.props;
    const [chat, setChat] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [commentState, setCommentState] = useState({ comment: "" });
    const [createComment,] = useMutation(ADD_COMMENT);
    const [editPost,] = useMutation(EDIT_POST);
    const [deletePost,] = useMutation(DELETE_POST);
    const [imageProps, setImageProps] = useState(true)
    const { data: userData, } = useQuery(QUERY_USER);

    const isUsersPost = () => {
        return user._id === userData.user._id
    }

    const handleChange = event => {
        setCommentState(event.target.value);
    };

    const handleCommentSubmit = () => {
        createComment({
            variables: {
                content: commentState,
                post: _id
            }
        });
        window.location = '/message-board'
    }

    const handleSelect = e => {
        e.target.style.height = 'inherit';
        // e.target.style.height = `${e.target.scrollHeight}px`;
        setChat(true)
    }
    const handleBlur = e => {
        e.target.style.height = '9vh';
    }

    const handleDelete = () => {
        deletePost({
            variables: {
                _id: _id
            }
        })
        window.location.reload()
    }

    useEffect(() => {
        let obj
        userData && (obj = viewedBy.find(x => x._id === userData.user._id))
        if (!obj) {
            userData && editPost({
                variables: {
                    _id: _id,
                    viewedBy: [...viewedBy, userData.user._id]
                }
            })
        }
    }, [userData])

    return (<>
        <Card className='m-1'>
            <Card.Header as='h5'>
                {user.username}
                <div className='cardHead'>
                    <Card.Text>
                        <small className="text-muted">{whatGym}</small>
                    </Card.Text>
                    {userData && isUsersPost() && <Card.Text>
                        <Button variant="outline-danger" onClick={() => setShowDeleteAlert(true)} size="sm">Remove</Button>
                    </Card.Text>}
                </div>
            </Card.Header>

            <Card.Body>

                <div className={imageProps ? 'postImgSmBg' : 'postImgBigBg'}>
                    {photoID && photoID.map((imgId, key) =>
                        <Image key={key} onClick={() => setImageProps(!imageProps)} className={imageProps ? 'postImg mx-auto' : 'postImgBig'} cloudName={"benwade"} publicId={imgId}></Image>)}
                </div>

                <Card.Text className={photoID ? 'cardContent mt-5' : 'mt-3'}>{content}</Card.Text>
                {comments.length > 0 && !commentsVisible && <Button onClick={() => setCommentsVisible(true)} variant="outline-secondary" size="sm">{comments.length} Comments</Button>}
                {commentsVisible && comments.map((comment, index) => <Comment key={index} props={comment} />)}
            </Card.Body>

            <Form className='m-1'>
                {comments.length === 0 ? <FloatingLabel controlId="floatingTextarea2" label='Comment'>
                    <Form.Control
                        as="textarea"
                        placeholder='Comment'
                        style={{
                            height: '9vh',
                            width: '95vw'
                        }}
                        onSelect={handleSelect}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='m-1'
                    />
                </FloatingLabel>
                    : commentsVisible &&
                    <FloatingLabel controlId="floatingTextarea2" label='Comment'>
                        <Form.Control
                            as="textarea"
                            placeholder='Comment'
                            style={{
                                height: '9vh',
                                width: '95vw'
                            }}
                            onSelect={handleSelect}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className='m-1'
                        />
                    </FloatingLabel>}


                {chat &&
                    <Button onClick={handleCommentSubmit} variant="primary" type="button">
                        Comment
                    </Button>}
            </Form>
        </Card>

        {showDeleteAlert &&
            <div className="alertBackground">
                <Alert className='alertBox' show={true} variant="danger">
                    <Alert.Heading>Are you sure?</Alert.Heading>
                    <p>
                        Its gonna be gone forever and you'll never see it again
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleDelete} className='me-auto' variant="outline-danger">
                            I'm Sure!
                        </Button>
                        <Button onClick={() => setShowDeleteAlert(!showDeleteAlert)} variant="success">
                            Nevermind!
                        </Button>
                    </div>
                </Alert>
            </div>}
    </>

    )
}

export default Post

