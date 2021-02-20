import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="LandingPage full-width">
            <div className="LandingPage-header">
                <div className="Landingpage-header-contents">
                    <h1><span id="logo-one">one</span><span id="logo-layover">layover</span></h1>
                    <p>The travel app for flight attendants by flight attendants</p>
                    <div className="Landingpage-header-buttons">
                        <Link to="/signup"><button id="signup-btn">SIGN UP</button> </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LandingPage;