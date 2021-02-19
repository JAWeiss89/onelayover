import React, { useState } from 'react';
import '../styles/EditCommentForm.css';

const EditCommentForm = ( {comment, toggleForm} ) => {
    const initialState = comment.body;
    const [bodyText, setBodyText] = useState(initialState);
    const handleChange = (e) => {
        setBodyText(e.target.value);
    }
    return (
        <div className="EditComment">
            
                <textarea value={bodyText} rows={4} cols={50} onChange={handleChange}/>
                <button>Update</button>
                <button className="EditComment-cancel" onClick={toggleForm}>Cancel</button>
            


        </div>
        
    )

}

export default EditCommentForm;