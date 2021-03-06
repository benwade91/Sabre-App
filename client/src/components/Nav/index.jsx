import React from 'react'
import { Link } from 'react-router-dom'
// import { OPEN_MENU } from "../../utils/actions";
import { useStoreContext } from '../../utils/GlobalState'
import logo from './images/sabre_logo_w_name.png'
// import checkin from './images/menu.png'
// import messenger from './images/messenger.png';
import './style.css'
import Auth from '../../utils/auth'

const Nav = () => {
  const [state] = useStoreContext()

  // const handleMenu = () => {
  //     dispatch({
  //               type: OPEN_MENU,
  //               menu: !state.menu
  //             })
  // }

  return (
    <>
      {/* <header> */}
      <nav className="nav navbar bg-dark">
        {!state.portalPage ? (
          <Link to="/">
            <img className="sabreLogo" src={logo} alt="Sabre Logo" />
          </Link>
        ) : (
          <Link to="/gymportal">
            <img className="sabreLogo" src={logo} alt="Sabre Logo" />
          </Link>
        )}
        {/* <div className='menuDropBtn' onClick={handleMenu}> */}
        {Auth.loggedIn() && (
          <Link to="/checkin">
            <img className="checkIn" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=$Sabre" alt="messages" />
          </Link>
        )}

        {/* </div> */}
      </nav>
      {/* </header> */}
      {/* <div className='dropDown'>
        {state.menu && <div className='menuItemContainer'>
        {Auth.loggedIn() ? 
            <div onClick={() => Auth.logout()} className='menuItem'>Log-out</div>
        : <div onClick={() => console.log('clicked')} className='menuItem'>Log in</div>
        }
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
        </div>}
        </div> */}
    </>
  )
}

export default Nav
