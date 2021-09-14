import React from 'react';
import { Link } from "react-router-dom";
import { OPEN_MENU } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import logo from './images/sabre_logo.png';
import menu from './images/menu.png';
import './style.css';
import Auth from "../../utils/auth";

const Nav = () => {

    const [state, dispatch] = useStoreContext();
    
    const handleMenu = () => {
        dispatch({
                  type: OPEN_MENU,
                  menu: !state.menu
                })
    }

    return (<>
        <header>
            <Link to='/'>
                <img className='sabreLogo' src={logo} alt="Sabre Logo" />
            </Link>
            <button className='menuDropBtn' onClick={handleMenu}><img className='menuDropPng' src={menu} alt=""/></button>
        </header>
        <div className='dropDown'>
        {state.menu && <div className='menuItemContainer'>
        {Auth.loggedIn() ? 
            <div onClick={() => Auth.logout()} className='menuItem'>Log-out</div>
        : <div onClick={() => console.log('clicked')} className='menuItem'>Log in</div>
        }
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
        </div>}
        </div>
        </>
    )
}

export default Nav
