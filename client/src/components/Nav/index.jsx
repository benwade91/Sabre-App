import React from 'react'
import { Link } from "react-router-dom";
import { OPEN_MENU } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import logo from './sabre_logo.png'
import './style.css'

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
                <img src={logo} alt="Sabre Logo" />
            </Link>
            <button className='menuButton' onClick={handleMenu}>menu</button>
        </header>
        <div className='dropDown'>
        {state.menu && <div className='menuItemContainer'>
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
            <div onClick={() => console.log('clicked')} className='menuItem'>item</div>
        </div>}
        </div>
        </>
    )
}

export default Nav
