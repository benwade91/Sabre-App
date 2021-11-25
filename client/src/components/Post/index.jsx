import React, { useState, } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useStoreContext } from "../../utils/GlobalState";


const Post = (props) => {
    const { content, title, user, whatGym } = props.props;
    const [chat, setChat] = useState(false)
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
            <Card.Header as='h5'>{title}</Card.Header>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
                <Card.Text><small className="text-muted">{whatGym}</small></Card.Text>
                <Card.Text><small className="text-muted">{user.username}</small></Card.Text>
            </Card.Body>
            {/* <Card.Img variant="bottom" src="holder.js/100px180" /> */}
            {/* <div className="comment-button-container m-1">
                {!chat && <Button onClick={() => { setChat(true) }}>Comment</Button>}
            </div> */}
            <FloatingLabel controlId="floatingTextarea2" label='Comment'>
                <Form.Control
                    as="textarea"
                    placeholder='Comment'
                    style={{ height: '9vh',
                    width: '95vw' }}
                    onSelect={handleSelect}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className='m-1'
                />
            </FloatingLabel>

            {chat && <Form className='m-1'>
                {/* <Form.Group className='mb-1'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" onChange={handleChange} value={commentState.comment} rows={3} />
                </Form.Group> */}
                <Button onClick={handleCommentSubmit} variant="primary" type="button">
                    Send
                </Button>
            </Form>}
        </Card>
    </>

    )
}

export default Post

