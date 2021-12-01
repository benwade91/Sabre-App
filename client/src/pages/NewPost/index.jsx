import React, { useState } from 'react'
import { FloatingLabel, Form, Button, Alert } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client";
import axios from 'axios'
import Dropzone from 'react-dropzone';
import './style.css'
import { ADD_POST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

const NewPost = () => {
    const [error, setError] = useState(undefined)
    const { data, } = useQuery(QUERY_USER);
    const [file, setFile] = useState(undefined)
    const [content, setContent] = useState('')
    const [createPost,] = useMutation(ADD_POST);

    // data && console.log(data.user);

    const handleDrop = async files => {
        setFile(files[0])
    }

    const handleChange = event => {
        setContent(event.target.value)
    }

    const submit = async () => {
        var photoID = null
        if (content.trim().length === 0) {
            setError('Maybe add some text?')
            return;
        }
        if (file !== undefined) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', "tq0g6exd")
            const response = await axios.post(`https://api.cloudinary.com/v1_1/benwade/image/upload`, formData)
            photoID = response.data.public_id;
            console.log(response);
        }
        try {
            createPost({
                variables: {
                    content: content,
                    photoID: photoID,
                    whatGym: data.user.whatGym,
                    announcement: false
                }
            });
            window.location = '/message-board';
        }
        catch (e) {
            console.error(e);
        }

    }


    return <>

        <Form className='m-3'>
            {error && <Alert className='mx-5' variant='warning'>
                {error}
            </Alert>}
            {/* <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                <Form.Control placeholder='title' />
            </FloatingLabel> */}
            <FloatingLabel controlId="floatingTextarea2" label='fill me up buttercup...'>
                <Form.Control
                    onChange={handleChange}
                    as="textarea"
                    placeholder='fill me up buttercup...'
                    style={{ height: '40vh' }}
                    className='mb-2'
                />
            </FloatingLabel>
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add a photo to your post</Form.Label>
                <Form.Control type="file" onChange={e => console.log(e)} accept="image/*" />
            </Form.Group> */}

            {/* <div  {...getRootProps({ className: 'dropzone' })} onDrop={handleDrop}>
                    <input accept="image/png, image/jpeg" {...getInputProps()} />
                    <p>click here to add an image</p>
                </div>
                <aside>
                    
                </aside> */}


            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input accept="image/*" {...getInputProps()} />
                        <p>click here to add an image</p>
                        {file && <span>{file.path} --READY--</span>}
                    </div>
                )}
            </Dropzone>

            {/* {console.log(files)} */}
            <div className='buttonContainer'>
                <Button className='mt-2' onClick={submit}>Post</Button>
            </div>
        </Form>
    </>
}

export default NewPost
