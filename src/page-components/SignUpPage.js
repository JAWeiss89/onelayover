import React from 'react';
import SignUpForm from '../components/SignUpForm';
import '../styles/AuthPages.css';

const SignUpPage = ( {notify, setUser} ) => {
    return (
        <div className="AuthPage">
            <h2>Sign Up.</h2>
            <SignUpForm setUser={setUser} notify={notify}/>
        </div>
    )
}

export default SignUpPage;