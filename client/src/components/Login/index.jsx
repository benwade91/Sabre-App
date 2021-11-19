import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks";
import { SET_CURRENT_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import './style.css';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import auth from '../../utils/auth';


const Login = () => {

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [errFlags, setErrFlags] = useState({ emailError: false });
    const [login, { error }] = useMutation(LOGIN_USER);
    const [state, dispatch] = useStoreContext();

    const handleChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        // if no errors, await response from backend, get token, and login
        if (!errFlags.emailError) {
            try {
                const { data } = await login({
                    variables: { ...formState }
                });
                dispatch({
                    type: SET_CURRENT_USER,
                    currentUser: data.login.user
                })
                Auth.login(data.login.token);
                Auth.loggedIn() && console.log(state);
                setFormState({ email: "", password: "" });
            }
            catch (e) {
                console.error(e);
            }
        }
    };

    // const tempClick = (event) => {
    //     event.preventDefault();
    //     console.log('signUp');
    // }

    return (
        <div className='signInFormContainer'>

        {Auth.loggedIn() && <Redirect to='/message-board'/>}
        
            {error && <Alert className='mx-5' variant='warning'>
                We werent able to find an account with thiose credentials! Try again!
            </Alert>}
            <Form className='signInForm'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name='email' value={formState.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name='password' value={formState.password} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login
