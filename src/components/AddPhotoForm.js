import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';

const AddPhotoForm = () => {
    const history = useHistory();
    const {layover_code, id} = useParams();
    const initialState = {
        caption: "",
        url: "",
        main_img: true
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
            let photoData = {
                userID : localStorage.userID,
                _token : localStorage._token,
                photo : formData
            }
            await OnelayoverAPI.postPhoto(layover_code, id, photoData);
            setFormData(initialState);
            history.push(`/layovers/${layover_code}`);
            history.push(`/layovers/${layover_code}/activities/${id}`);
        } catch(err) {
            console.log({err})
        }    
    }
    return (
        <div className="AddPhotoForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="caption">Caption: </label>
                <input type="text" id="caption" name="caption" onChange={handleChange} value={formData.caption} />
                <label htmlFor="url">URL: </label>
                <input type="text" id="url" name="url" onChange={handleChange} value={formData.url} />
                <label htmlFor="main_img">Main Image ? </label>
                <select id="main_img" name="main_img" onChange={handleChange} value={formData.main_img} >
                    <option value={true} >True</option>
                    <option value={false} >False</option>
                </select>
                <button>Submit!</button>                
            </form>
        </div>
    )
}

export default AddPhotoForm;