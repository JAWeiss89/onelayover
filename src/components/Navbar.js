import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = ({user, setUser}) => {
    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        setUser(null);
        history.push("/");
    }
    
    return (
        <div className="Navbar">
            <div className="Navbar-logo">
                < NavLink to="/">onelayover</NavLink>
            </div>
            {user
            ?
            <div className="Navbar-links">
            < NavLink to="/layovers">layovers</NavLink>
            < NavLink onClick={logout} to="/">logout @ {user.username}</NavLink>
            </div>
            :
            <div className="Navbar-links">
            < NavLink to="/login">login</NavLink>
            < NavLink to="/signup">sign up</NavLink>
            </div>
            }

            
        </div>
    )
}

export default Navbar;