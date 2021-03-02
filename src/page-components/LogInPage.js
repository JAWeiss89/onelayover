import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/AuthPages.css';

const LoginPage = ( {setUser, notify} ) => {
    return (
        <div className="AuthPage">
            <h2>Log in.</h2>
            <LoginForm setUser={setUser}  notify={notify}/>
        </div>
    )
}

export default LoginPage;