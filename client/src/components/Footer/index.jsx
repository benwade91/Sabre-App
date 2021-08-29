import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

import messageBoardPng from './images/coworking.png'
import myMessagesPng from './images/email.png'
import announcementPng from './images/megaphone.png'
import settingsPng from './images/settings.png'

const Home = () => {
    return (
        <>
            <div className='mainMenu'>
                <Link className='mainMenuBtnCase' to='/announcements'>
                    <button className='mainMenuBtn announcementsBtn'>
                        <img className='mainMenuBtnPng' src={announcementPng} alt="announcements" />
                    </button>
                </Link>
                <Link className='mainMenuBtnCase' to='/my-messages'>
                    <button className='mainMenuBtn myMessagesBtn'>
                        <img className='mainMenuBtnPng' src={myMessagesPng} alt="private messages" />
                    </button>
                </Link>
                <Link className='mainMenuBtnCase' to='/message-board'>
                    <button className='mainMenuBtn messageBoardBtn'>
                        <img className='mainMenuBtnPng' src={messageBoardPng} alt="team message board" />
                    </button>
                </Link>
                <Link className='mainMenuBtnCase' to='/settings'>
                    <button className='mainMenuBtn settingsBtn'>
                        <img className='mainMenuBtnPng' src={settingsPng} alt="settings" />
                    </button>
                </Link>
            </div>
        </>
    )
}


export default Home;