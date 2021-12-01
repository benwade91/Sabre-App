import React, { useState, } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap'
import { Comment } from '../Comment'
import { Image } from 'cloudinary-react';
import './style.css';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from "@apollo/client";

const Post = (props) => {
    const { content, user, whatGym, comments, photoID, _id } = props.props;
    const [chat, setChat] = useState(false)
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [commentState, setCommentState] = useState({ comment: "" });
    const [createComment,] = useMutation(ADD_COMMENT);
    const [imageProps, setImageProps] = useState(true)

    const handleChange = event => {
        setCommentState(event.target.value);
    };

    const handleCommentSubmit = () => {
        console.log('clicked')
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
        e.target.style.height = `${e.target.scrollHeight}px`;
        setChat(true)
    }
    const handleBlur = e => {
        e.target.style.height = '9vh';
    }

    return (<>
        <Card className='m-1'>
            <Card.Header as='h5'>
                {user.username}

                <Card.Text>
                    <small className="text-muted">{whatGym}</small>
                </Card.Text>
            </Card.Header>

            <Card.Body>

                <div className={imageProps ? undefined : 'postImgBigBg'}>
                    {photoID && <Image onClick={() => setImageProps(!imageProps)} className={imageProps ? 'postImg' : 'postImgBig'} cloudName={"benwade"} publicId={photoID}></Image>}
                </div>

                <Card.Text className='mt-5'>{content}</Card.Text>
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
    </>

    )
}

export default Post

