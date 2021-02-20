import React from 'react';
import SignUpForm from '../components/SignUpForm';
import '../styles/AuthPages.css';

const SignUpPage = () => {
    return (
        <div className="AuthPage">
            <h2>Sign Up.</h2>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage;