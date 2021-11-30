import React, { useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client";
import axios from 'axios'
import Dropzone, { useDropzone } from 'react-dropzone';
import './style.css'
import { ADD_POST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

const NewPost = () => {
    const { data, } = useQuery(QUERY_USER);
    const [file, setFile] = useState(null)
    const [content, setContent] = useState('')
    const [createPost,] = useMutation(ADD_POST);

    const handleDrop = async files => {
        setFile(files[0])
    }

    const handleChange = event => {
        setContent(event.target.value)
        console.log(content);
    }

    const submit = async () => {
        var photoID = null
        if (file !== null) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', "tq0g6exd")
            console.log(file);
            const response = await axios.post(`https://api.cloudinary.com/v1_1/benwade/image/upload`, formData)
            photoID = response.data.public_id;
            console.log(response);
        }

        try {
            createPost({
                variables: {
                    content: content,
                    photoID: photoID,
                    whatGym: 'Sabre',
                    announcement: false
                }
            });
            console.log('it worked!');
            window.location = '/message-board';
        }
        catch (e) {
            console.error(e);
        }

    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return <>

        <Form className='m-3'>
            {/* <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                <Form.Control placeholder='title' />
            </FloatingLabel> */}
            <FloatingLabel controlId="floatingTextarea2" label='fill me up buttercup...'>
                <Form.Control
                    onChange={handleChange}
                    as="textarea"
                    placeholder='fill me up buttercup...'
                    style={{ height: '40vh' }}
                />
            </FloatingLabel>
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add a photo to your post</Form.Label>
                <Form.Control type="file" onChange={e => console.log(e)} accept="image/*" />
            </Form.Group> */}

            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div className='dropzone' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>

            <Button onClick={submit}>Post</Button>
        </Form>
    </>
}

export default NewPost
