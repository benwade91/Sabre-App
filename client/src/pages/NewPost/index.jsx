import React, { useState } from 'react'
import { FloatingLabel, Form, Button, Alert, ToggleButton } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client";
import axios from 'axios'
import Dropzone from 'react-dropzone';
import './style.css'
import { ADD_POST } from '../../utils/mutations';
import { QUERY_USER, QUERY_ALL_POSTS } from '../../utils/queries';
import { useHistory } from "react-router-dom";

const NewPost = () => {
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(undefined)
    const { data, } = useQuery(QUERY_USER);
    const [file, setFile] = useState(undefined)
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [createPost,] = useMutation(ADD_POST);
    const history = useHistory();
    
    const handleDrop = async files => {
        if (!file) {
            setFile([files[0]])
        } else {
            setFile([...file, files[0]])
        }
    }

    const handleChange = event => {
        setContent(event.target.value)
    }

    const handleYTLink = (event) => {
        //eslint-disable-next-line
        let yTLink = event.target.value.match(/([^\/]+$)/)[0]
        setLink(yTLink)
    }

    const uploadImgFiles = async () => {
        let photoID = []
        if (!file) { return photoID }
        else {
            return Promise.all(file.map(async (imgFile) => {
                let formData = new FormData()
                formData.append('file', imgFile)
                formData.append('upload_preset', "tq0g6exd")
                let response = await axios.post(`https://api.cloudinary.com/v1_1/benwade/image/upload`, formData)
                console.log(response);
                return response.data.public_id;
            }))
        }

    }

    const submit = async () => {
        if (content.trim().length === 0) {
            setError('Maybe add some text?')
            return;
        }
        uploadImgFiles().then(photoID =>{
        try {
            createPost({
                variables: {
                    content: content,
                    photoID: photoID,
                    whatGym: data.user.whatGym,
                    announcement: checked,
                    youtubeLink: link
                },
                refetchQueries: [{ query: QUERY_ALL_POSTS }],
            });

            console.log(photoID);
            history.push('/message-board')
        }
        catch (e) {
            console.error(e);
        }})

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
                    style={{ height: '35vh' }}
                    className='mb-2'
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label='youtube link (optional)'>
                <Form.Control
                    onChange={handleYTLink}
                    as="input"
                    placeholder='youtube link (optional)'
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
                        <p>Click here to add an image</p>
                        {file && file.map((file, index) => <span key={index}>{file.path} --READY--</span>)}
                    </div>
                )}
            </Dropzone>

            {/* {console.log(files)} */}
            <div className='buttonContainer'>
                <Button className='mt-2' onClick={submit}>Post</Button>
                {data && data.user.administrator &&
                    <ToggleButton
                        className="mt-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-danger"
                        checked={checked}
                        value="1"
                        onChange={() => setChecked(!checked)}>
                        Team Announcement {checked && '✔️'}
                    </ToggleButton>}
            </div>
        </Form>
    </>
}

export default NewPost
