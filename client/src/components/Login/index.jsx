import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks";
import { SET_CURRENT_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import './style.css';
import { Link } from 'react-router-dom';

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
                Auth.loggedIn() && console.log('logged in');
                setFormState({ email: "", password: "" });
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    
    const tempClick = (event) => {
        event.preventDefault();
        console.log('signUp');
    }

    return (
        <div className='signInFormContainer'>
        <form className='signInForm'>
            <input className='signInInput' autoComplete='email' onChange={handleChange} type="text" placeholder='email' name='email' />
            <input className='signInInput' autoComplete='current-password' onChange={handleChange} type="password" placeholder='password' name='password' />
            <div className='buttonContainer'>
            <button className='loginBtn' onClick={handleFormSubmit}>Login</button>
            {/* <button className='loginBtn signUp' onClick={tempClick}>Sign-up</button> */}
            <Link className='loginBtn signUp' to="/signup">Sign-up</Link>
            </div>
            {error && <h1>Try Again</h1>}
            {state.currentUser && <h1>{state.currentUser.username}</h1>}
        </form>
        </div>
    )
}

export default Login
