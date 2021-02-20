import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/AuthPages.css';

const LoginPage = ( {setUser} ) => {
    return (
        <div className="AuthPage">
            <h2>Log in.</h2>
            <LoginForm setUser={setUser} />
        </div>
    )
}

export default LoginPage;