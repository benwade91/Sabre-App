import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const NewPost = () => {
    return <>
        <Form className='m-1'>
            <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                <Form.Control placeholder='title' />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label='fill me up buttercup...'>
                <Form.Control
                    as="textarea"
                    placeholder='fill me up buttercup...'
                    style={{ height: '40vh' }}
                />
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add a photo to your post</Form.Label>
                <Form.Control type="file" accept="image/*"/>
            </Form.Group>
        </Form>
    </>
}

export default NewPost
