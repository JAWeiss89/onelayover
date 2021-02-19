import React, {useState} from  'react';
import { useHistory, useParams } from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/AddCommentForm.css';

const AddCommentForm = ({ activity }) => {
    const history = useHistory();
    const { layover_code } = useParams();
    const [commentBody, setCommentBody] = useState("");
    const handleChange = (e) => {
        const {value} = e.target;
        setCommentBody(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const commentData = {
            userID: localStorage.userID,
            _token: localStorage._token,
            comment: {body: commentBody}
        }
        OnelayoverAPI.postComment(layover_code, activity.id, commentData);
        setCommentBody("");
        history.push(`/layovers/${layover_code}/activities/${activity.id}`);

    }
    
    return (
        <div className="AddCommentForm">
            <form onSubmit={handleSubmit} >
                <label htmlFor="body">Comment: </label>
                <textarea rows={5} type="text" id="body" name="body" onChange={handleChange} value={commentBody} />
                <button>Submit!</button>
            </form>
        </div>
    )
}

export default AddCommentForm;