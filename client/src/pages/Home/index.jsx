import React from 'react'
// import Login from '../../components/Login'
import Nav from '../../components/Nav'
import './style.css'

const Home = () => {
    return (
        <>
          <Nav />
          <div className='mainMenu'>
              <button className='mainMenuBtn announcementsBtn'></button>
              <button className='mainMenuBtn myMessagesBtn'></button>
              <button className='mainMenuBtn messageBoardBtn'></button>
              <button className='mainMenuBtn settingsBtn'></button>
          </div>
        </>
    )
}


export default Home;