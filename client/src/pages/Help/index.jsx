import React, { useState } from 'react';
import { FloatingLabel, Form, Button, ButtonGroup, ToggleButton, Alert } from 'react-bootstrap';
import { HELP_MESSAGE } from '../../utils/mutations';
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import './style.css'
const Help = () => {
    const [textarea, setTextarea] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [helpWith, setHelpWith] = useState('app')
    const [helpMessage,] = useMutation(HELP_MESSAGE);
    const [state,] = useStoreContext();

    const handleChange = (e) => {
        setTextarea(e.target.value)
        setError(false)
    }
    const handleSubmit = () => {
        if (textarea === ''){
            setError(true)
        } else {
            helpMessage({
                variables: {
                    user: state.currentUser.username,
                    email: state.currentUser.email,
                    helpWith: helpWith,
                    content: textarea,
                },
            });
            setSuccess(true)
        }
    }

    return (
        <div className='helpPage'>
            {success ? <Alert>Message sent successfully. We'll get back to you!</Alert> :
            <>
            <span>What do you want help with?</span>
            <Form>
                <ButtonGroup className='mt-2'>
                    <ToggleButton
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value='app'
                        checked={helpWith === 'app'}
                        onClick={() => setHelpWith('app')}
                    >
                        App
                    </ToggleButton>
                    <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="radio"
                        value='gym'
                        checked={helpWith === 'gym'}
                        onClick={() => setHelpWith('gym')}
                    >
                        Gym
                    </ToggleButton>
                </ButtonGroup>

                {error && <Alert variant='danger'>The text area below must be filled out!</Alert>}

                <FloatingLabel className='mt-2' controlId="floatingTextarea2" label={
                    helpWith === 'app' ? 
                    'Message to White Belt Ben:':
                    'Message to Coach Bryant:'
                }>
                    <Form.Control
                        onChange={handleChange}
                        as="textarea"
                        placeholder='fill me up buttercup...'
                        style={{ height: '35vh' }}
                        className='mb-2'
                    />
                </FloatingLabel>
                <Button onClick={handleSubmit}>Send</Button>
            </Form>
            </>}
        </div>
    )
}

export default Help
