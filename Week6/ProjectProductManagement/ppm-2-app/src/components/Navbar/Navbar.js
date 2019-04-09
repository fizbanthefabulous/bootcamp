import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const Navbar = (props) => {
    return (
        <div className='ppm-navbar'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h1 className="navbar-brand">PPM - Project Product Management</h1>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item${props.page === 'home' ? ' active' : ''}`}>
                            <Link to='/home' className="nav-link">Home</Link>
                        </li>
                        <li className={`nav-item${props.page === 'products' ? ' active' : ''}`}>
                            <Link to='/products' className="nav-link">Products List</Link>
                        </li>
                        <li className={`nav-item${props.page === 'products/new' ? ' active' : ''}`}>
                            <Link to='products/new' className="nav-link">Product Creation</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => ({
    page: state.page,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    //No action needed
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Navbar);