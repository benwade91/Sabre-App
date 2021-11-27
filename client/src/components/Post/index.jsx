import React, { useState, } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap'
import { Comment } from '../Comment'


const Post = (props) => {
    const { content, user, whatGym, comments } = props.props;
    const [chat, setChat] = useState(false)
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [commentState, setCommentState] = useState({ comment: "" });
    // const [state, dispatch] = useStoreContext();

    const handleChange = event => {
        // destructure event target
        const { value } = event.target;
        // update state
        setCommentState({ ...commentState, comment: value });
    };

    const handleCommentSubmit = () => {
        console.log(commentState.comment)
        // console.log(state.currentUser.username)
    }

    const handleSelect = e => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setChat(true)
    }
    const handleBlur = e => {
        e.target.style.height = '9vh';
        setChat(false)
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
                <Card.Text>{content}</Card.Text>
                {comments.length > 0 && !commentsVisible && <Button onClick={() => setCommentsVisible(true)} variant="outline-secondary" size="sm">{comments.length} Comments</Button>}
                {commentsVisible && comments.map((comment, index) => <Comment key={index} props={comment} />)}
            </Card.Body>

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
            :  commentsVisible && 
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


            {chat && <Form className='m-1'>
                <Button onClick={handleCommentSubmit} variant="primary" type="button">
                    Send
                </Button>
            </Form>}
        </Card>
    </>

    )
}

export default Post

