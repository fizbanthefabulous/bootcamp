import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <header>
            <img src='./imgs/logo.png' alt='Shinto Gate' />
            <div id='nav'>
                <Link to='/home'>Home</Link>
                <Link to='/mine'>Mine Coins</Link>
                <Link to='/buy'>Buy Coins</Link>
                <Link to='/sell'>Sell Coins</Link>
                <Link to='/ledger'>Browse Ledger</Link>
            </div>
        </header>
    )
}

export default Navbar;