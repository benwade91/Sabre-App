import React from 'react';
import Auth from '../../utils/auth';
import './style.css'

const MessageBoard = () => {
    return <div className='settingsPage'>
        <button className='logOutBtn' onClick={Auth.logout}>Log-out</button>
    </div>
}

export default MessageBoard