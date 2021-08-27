import React from 'react';
import { Link } from "react-router-dom";
// import Login from '../../components/Login'
import Nav from '../../components/Nav';
import './style.css';

import messageBoardPng from './images/conversation.png'
import myMessagesPng from './images/email.png'
import announcementPng from './images/megaphone.png'
import settingsPng from './images/settings.png'

const Home = () => {
    return (
        <>
          <Nav />
          <div className='mainMenu'>
              <button className='mainMenuBtn announcementsBtn'>
              <img className='mainMenuBtnPng' src={announcementPng} alt="announcements"/>
              </button>
              <button className='mainMenuBtn myMessagesBtn'>
              <img className='mainMenuBtnPng' src={myMessagesPng} alt="private messages"/>
              </button>
              <button className='mainMenuBtn messageBoardBtn'>
              <img className='mainMenuBtnPng' src={messageBoardPng} alt="team message board"/>
              </button>
              <button className='mainMenuBtn settingsBtn'>
              <img className='mainMenuBtnPng' src={settingsPng} alt="settings"/>
              </button>
          </div>
        </>
    )
}


export default Home;