import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';


const AddActivityForm = () => {
    const history = useHistory();
    const {layover_code} = useParams();
    const initialState = {
        title: "",
        description: "",
        body: "",
        address: "",
        type_id: ""
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
            let layoverData = {
                userID: localStorage.userID,
                _token: localStorage._token, 
                activity: formData
            }
            let {message} = await OnelayoverAPI.postActivity(layover_code, layoverData);
            console.log({message});
            setFormData(initialState);
            history.push(`/layovers/${layover_code}`);
        } catch(err) {
            console.log({err})
            
        }
    }

    return (
        <div className="AddActivityForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" onChange={handleChange} value={formData.title} />
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" onChange={handleChange} value={formData.description} />
                <label htmlFor="body">Body: </label>
                <input type="text" id="body" name="body" onChange={handleChange} value={formData.body} />
                <label htmlFor="address">Address: </label>
                <input type="text" id="address" name="address" onChange={handleChange} value={formData.address} />
                <label htmlFor="type">Activity Type: </label>
                <input type="text" id="type" name="type_id" onChange={handleChange} value={formData.type_id} />
                <button>Submit!</button>
            </form>
        </div>
    )
}

export default AddActivityForm;