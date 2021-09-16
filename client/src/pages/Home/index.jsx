import React from 'react';
import './style.css';
import schedule from './images/schedule.png';
import Login from '../../components/Login';
import Auth from '../../utils/auth';

const Home = () => {
    return (
        <>
        {!Auth.loggedIn() && <Login />}
            <img src={schedule} className='schedulePng' alt="gym schedule"/>
        </>
    )
}


export default Home;