import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import "../styles/AuthForm.css";
import OnelayoverAPI from '../onelayoverAPI';


const SignUpForm = ( {setUser, notify} ) => {
    const history = useHistory();

    const initialState = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        airline: ""
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
            if (!formData.username || !formData.password || !formData.first_name || !formData.last_name || !formData.email || !formData.airline) {
                notify("Please fill in all fields")
            } else if (!formData.email.includes('@')) {
                notify("Please enter a valid email")
            } else {
            let {token, userID} = await OnelayoverAPI.signUp({user: formData});
            localStorage._token = token;
            localStorage.userID = userID;
            setFormData(initialState);
            let foundUser = await OnelayoverAPI.getUser(userID);
            notify(null);
            setUser(foundUser);
            history.push("/");
            }
        } catch(err) {
             console.log(err);
            notify('Not able to register user. Please try again')
        }
    }

    return (
        <div className="AuthForm">
            <form onSubmit={handleSubmit }>
                <label htmlFor="username">Username </label>
                <input type="text" name="username" id="username" onChange={handleChange} value={formData.username} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" autoComplete="off" onChange={handleChange} value={formData.password}/>
                <label htmlFor="first_name">First Name: </label>
                <input type="text" name="first_name" id="first_name" onChange={handleChange} value={formData.first_name}/>
                <label htmlFor="last_name">Last Name: </label>
                <input type="text" name="last_name" id="last_name" onChange={handleChange} value={formData.last_name}/>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" onChange={handleChange} value={formData.email}/>
                <label htmlFor="airline">Airline: </label>
                <input type="text" name="airline" id="airline" onChange={handleChange} value={formData.airline}/>
                <button>Submit</button>
            </form>
        </div>    

    )
}

export default SignUpForm;