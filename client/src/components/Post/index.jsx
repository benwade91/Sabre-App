import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

const Post = (props) => {
    const { content, title, user, whatGym } = props.props;
    const [chat, setChat] = useState(false)

    return (<>
        <Card className='m-1'>
            <Card.Header as='h5'>{title}</Card.Header>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
                <Card.Text><small class="text-muted">{whatGym}</small></Card.Text>
                <Card.Text><small class="text-muted">{user.username}</small></Card.Text>
            </Card.Body>
            {/* <Card.Img variant="bottom" src="holder.js/100px180" /> */}
            {!chat && <Button variant='outline-primary' onClick={() => { setChat(true) }}>Comment</Button>}
            {chat && <Form className='m-1'>
                <Form.Group className='mb-1'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>}
        </Card>
    </>

    )
}

export default Post

