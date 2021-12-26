import React from 'react'
import Auth from '../../utils/auth'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './style.css'

const MessageBoard = () => {
  const history = useHistory()

  return (
    <>
      <div className="settingsPage">
        <Button
          variant="outline-primary"
          className="logOutBtn"
          onClick={() => history.push('/help')}
        >
          Help
        </Button>
        <Button
          variant="outline-primary"
          className="logOutBtn"
          onClick={() => history.push('/about')}
        >
          About
        </Button>

        {Auth.loggedIn() ? (
          <Button
            variant="outline-danger"
            className="logOutBtn"
            onClick={Auth.logout}
          >
            Log-out
          </Button>
        ) : (
          <Button
            variant="outline-danger"
            className="logOutBtn"
            onClick={() => history.push('/login')}
          >
            Log-in
          </Button>
        )}
      </div>
    </>
  )
}

export default MessageBoard
