import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks";
import { SET_CURRENT_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

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
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    
    return (
        <form>
            <input onChange={handleChange} type="text" placeholder='email' name='email' />
            <input onChange={handleChange} type="password" placeholder='password' name='password' />
            <button onClick={handleFormSubmit}>Login</button>
            {error && <h1>there was an error logging in</h1>}
            {state.currentUser && <h1>{state.currentUser.firstName}</h1>}
        </form>
    )
}

export default Login
