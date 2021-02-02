import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="Navbar-logo">
                < NavLink to="/">onelayover</NavLink>
            </div>
            <div className="Navbar-links">
                < NavLink to="/layovers">layovers</NavLink>
                < NavLink to="/login">login</NavLink>
                < NavLink to="/signup">sign up</NavLink>
            </div>
            
        </div>
    )
}

export default Navbar;