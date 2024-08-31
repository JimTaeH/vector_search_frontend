import React from 'react';
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import logo from '../assets/logo.png'

function MyNavBar() {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: "transparent"}}>
                <a className='ms-3' href='/'> <img src={logo} alt='...'></img> </a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end me-3" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white font-weight-medium" to="/searchresults" style={{fontWeight: "bolder"}}> Search Products </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default MyNavBar;