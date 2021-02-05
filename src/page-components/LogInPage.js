import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ( {setUser} ) => {
    return (
        <div className="LoginPage">
            <h2>Log in.</h2>
            <LoginForm setUser={setUser} />
        </div>
    )
}

export default LoginPage;