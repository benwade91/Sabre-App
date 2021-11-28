import React from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { useMutation } from "@apollo/client";
import { SINGLE_UPLOAD } from '../../utils/mutations';

const NewPost = () => {

    const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
    const onChange = ({
        target: {
            validity,
            files: [file]
        }}) => validity.valid && mutate({ variables: { file } });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return <>
        <Form className='m-3'>
            {/* <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                <Form.Control placeholder='title' />
            </FloatingLabel> */}
            <FloatingLabel controlId="floatingTextarea2" label='fill me up buttercup...'>
                <Form.Control
                    as="textarea"
                    placeholder='fill me up buttercup...'
                    style={{ height: '40vh' }}
                />
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add a photo to your post</Form.Label>
                <Form.Control type="file" onChange={onChange} accept="image/*" />
            </Form.Group>
            <Button>Post</Button>
        </Form>
    </>
}

export default NewPost
