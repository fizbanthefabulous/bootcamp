import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="ppm-navbar">
                <h1 className="navbar-brand">Project Product Management</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ppm-item">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ppm-item">
                            <Link className="nav-link" to="/products">Product List</Link>
                        </li>
                        <li className="nav-item ppm-item">
                            <Link className="nav-link" to="products/new">Product Creation</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;