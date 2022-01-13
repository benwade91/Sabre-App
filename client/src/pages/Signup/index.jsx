import React, { useState, useEffect } from 'react'
import './style.css'
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { useStoreContext } from '../../utils/GlobalState'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_USER } from '../../utils/mutations'
import { QUERY_USER_BY_USERNAME } from '../../utils/queries'
import { SET_CURRENT_USER } from '../../utils/actions'
import Auth from '../../utils/auth'
// import { Redirect } from 'react-router-dom';

export const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    beltColor: 'White',
    whatGym: 'Sabre',
    email: '',
    password1: '',
    password2: '',
    error: undefined,
  })
  const [errFlags] = useState({ emailError: false })
  const [createUser] = useMutation(ADD_USER)
  const [, dispatch] = useStoreContext()
  const { data, refetch } = useQuery(QUERY_USER_BY_USERNAME, {
    variables: { username: formState.username },
  })

  useEffect(() => {
    refetch()
    data && data.getUserByUsername ?
      setFormState({
        ...formState,
        error: 'Theres already a user with that username!',
      }):
      setFormState({
        ...formState,
        error: undefined,
      })
  }, [formState.username, data])

  const handleChange = (event) => {
    // destructure event target
    const { name, value } = event.target
    // update state
    setFormState({ ...formState, [name]: value })
    // name == 'username' && refetch()
  }

  const handleFormSubmit = async (event) => {
    console.log(formState)
    event.preventDefault()
    // if no errors, await response from backend, get token, and login
    if (formState.password1 !== formState.password2) {
      setFormState({ ...formState, error: 'Passwords do not match' })
    } else if (!errFlags.emailError) {
      try {
        const { data } = await createUser({
          variables: {
            username: formState.username,
            administrator: false,
            beltColor: formState.beltColor,
            email: formState.email,
            password: formState.password1,
            whatGym: formState.whatGym,
          },
        })
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: data.addUser,
        })
        Auth.login(data.addUser.token)
        window.location.assign('/message-board')
        // setFormState({ email: "", password: "" });
      } catch (e) {
        let errorMsg = e.graphQLErrors[0].message
        if (errorMsg.includes('E11000 duplicate key')) {
          setFormState({
            ...formState,
            error: 'Theres already an account with that email!',
          })
        } else {
          setFormState({ ...formState, error: 'Something went wrong!' })
          console.log(e.message)
        }
      }
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Register</h2>
        <p className="hint-text">Create your account.</p>
        {formState.error && (
          <Alert className="mx-5" variant="warning">
            {formState.error}
          </Alert>
        )}
        <Form>
          <FloatingLabel
            label="Username"
            controlId="floatingInput1"
            className="mb-3"
          >
            <Form.Control
              onChange={handleChange}
              autoComplete='username'
              name="username"
              type="text"
              placeholder="Username"
              value={formState.username}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="floatingSelect1"
            label="Belt Level"
          >
            <Form.Select
              onChange={handleChange}
              name="beltColor"
              aria-label="Floating label select example"
            >
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="floatingSelect2"
            label="Home Gym"
          >
            <Form.Select
              onChange={handleChange}
              name="whatGym"
              aria-label="Floating label select example"
            >
              <option value="Sabre">Sabre</option>
              <option value="T4L">T4L</option>
              <option value="East Bay Academy">East Bay Academy</option>
              <option value="Dumlao's">Dumlao's</option>
              <option value="Big Break">Big Break</option>
              <option value="Rooted">Rooted</option>
              <option value="Visitor">Visitor</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            label="Email"
            controlId="floatingInput2"
            className="mb-3"
          >
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
              value={formState.email}
            />
          </FloatingLabel>

          <FloatingLabel
            label="Password"
            controlId="floatingInput3"
            className="mb-3"
          >
            <Form.Control
              onChange={handleChange}
              autoComplete='new-password'
              name="password1"
              type="password"
              placeholder="Password"
              value={formState.password1}
            />
          </FloatingLabel>

          <FloatingLabel
            label="Re-enter Password"
            controlId="floatingInput4"
            className="mb-3"
          >
            <Form.Control
              onChange={handleChange}
              autoComplete='new-password'
              name="password2"
              type="password"
              placeholder="Password"
              value={formState.password2}
            />
          </FloatingLabel>

          <div className="text-center">
            <Button
              className="mx-1"
              variant="success"
              type="submit"
              onClick={handleFormSubmit}
            >
              Sign Up
            </Button>
            <Button
              className="mx-1"
              variant="outline-primary"
              type="button"
              onClick={() => {
                window.location = '/'
              }}
            >
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
