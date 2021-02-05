import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import "../styles/AuthForm.css"
import OnelayoverAPI from '../onelayoverAPI';

const LoginForm = ( { setUser } ) => {
    const history = useHistory();

    const initialState = {
        username: "",
        password: ""
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData, [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let {token, userID} = await OnelayoverAPI.login(formData);
            localStorage._token = token;
            localStorage.userID = userID;
            setFormData(initialState);
            let foundUser = await OnelayoverAPI.getUser(userID);
            setUser(foundUser);
            history.push("/");
        } catch(err) {
            console.log({err})
        }
    }


    return (
        <div className= "AuthForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username </label>
                <input type="text" name="username" id="username" onChange={handleChange} value={formData.username} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" autoComplete="off" onChange={handleChange} value={formData.password}/>
                <button>Submit</button>
            </form>

        </div>
    )
}

export default LoginForm;