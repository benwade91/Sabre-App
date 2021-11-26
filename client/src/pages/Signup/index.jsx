import React, { useState } from 'react';
import './style.css';
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { SET_CURRENT_USER } from '../../utils/actions';
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';


export const Signup = () => {
    const [formState, setFormState] = useState({ username: "", beltColor:'White', email: "", password1: "", password2: "", error: undefined });
    const [errFlags,] = useState({ emailError: false });
    const [createUser,] = useMutation(ADD_USER);
    const [state, dispatch] = useStoreContext();

    const handleChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ ...formState, [name]: value });
    };
    
    const handleFormSubmit = async event => {
        console.log(formState)
        event.preventDefault();
        // if no errors, await response from backend, get token, and login
        if (!errFlags.emailError) {
            try {
                const { data } = await createUser({
                    variables: {
                        username: formState.username,
                        administrator: false,
                        beltColor: formState.beltColor,
                        email: formState.email,
                        password: formState.password1
                    }
                });
                dispatch({
                    type: SET_CURRENT_USER,
                    currentUser: data.addUser
                })
                Auth.login(data.addUser.token);
                window.location.assign('/message-board')
                // setFormState({ email: "", password: "" });
            }
            catch (e) {
                console.error(e);
                setFormState({ ...formState, error: 'Something went wrong!' });
            }
        }
    };

    return (
        <div className='signup-page'>
            <div className="signup-form">
                <h2>Register</h2>
                <p className="hint-text">Create your account.</p>
                {formState.error && <Alert className='mx-5' variant='warning'>
                    {formState.error}
                </Alert>}
                <Form>

                    <FloatingLabel label='Username' controlId="floatingInput" className="mb-3">
                        <Form.Control onChange={handleChange} name='username' type="text" placeholder="Username" value={formState.username} />
                    </FloatingLabel>

                    <FloatingLabel className="mb-3" controlId="floatingSelect" label="Belt Level">
                        <Form.Select onChange={handleChange} name='beltColor' aria-label="Floating label select example">
                            <option value="White">White</option>
                            <option value="Blue">Blue</option>
                            <option value="Purple">Purple</option>
                            <option value="Brown">Brown</option>
                            <option value="Black">Black</option>
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label='Email' controlId="floatingInput" className="mb-3">
                        <Form.Control onChange={handleChange} name='email' type="email" placeholder="Enter email" value={formState.email} />
                    </FloatingLabel>

                    <FloatingLabel label='Password' controlId="floatingInput" className="mb-3">
                        <Form.Control onChange={handleChange} name='password1' type="password" placeholder="Password" value={formState.password1} />
                    </FloatingLabel>

                    <FloatingLabel label="Re-enter Password" controlId="floatingInput" className="mb-3">
                        <Form.Control onChange={handleChange} name='password2' type="password" placeholder="Password" value={formState.password2} />
                    </FloatingLabel>

                    <div className='text-center'>
                        <Button className='mx-auto btn-lg' variant="success" type="submit" onClick={handleFormSubmit}>
                            Sign Up
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}
