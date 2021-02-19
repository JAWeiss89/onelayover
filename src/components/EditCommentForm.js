import React, { useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/EditCommentForm.css';

const EditCommentForm = ( {comment, toggleForm} ) => {
    const history = useHistory();
    const {layover_code, id} = useParams();
    const initialState = comment.body;
    const commentID = comment.id;
    const [bodyText, setBodyText] = useState(initialState);

    const handleChange = (e) => {
        setBodyText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {userID, _token} = localStorage;
        const commentData = {userID, _token, comment: {body: bodyText}}
        await OnelayoverAPI.editComment(commentID, commentData);
        history.push(`/layovers/${layover_code}`);
        history.push(`/layovers/${layover_code}/activities/${id}`);
    }

    return (
        <div className="EditComment">
            
                <textarea value={bodyText} rows={4} cols={50} onChange={handleChange}/>
                <button onClick={handleSubmit}>Update</button>
                <button className="EditComment-cancel" onClick={toggleForm}>Cancel</button>
            


        </div>
        
    )

}

export default EditCommentForm;