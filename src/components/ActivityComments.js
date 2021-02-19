import React, {useEffect, useState} from 'react';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/ActivityComments.css';
import EditCommentForm from './EditCommentForm';

const ActivityComments = ( {comment} ) => {
    const [authorData, setAuthorData] = useState(false);
    const currentUserID = Number(localStorage.userID);
    const [formShown, setFormShown] = useState(false);

    const toggleForm = () => {
        formShown ? setFormShown(false) : setFormShown(true);
    }
    useEffect(() => {
        async function getAuthorData() {
            let user = await OnelayoverAPI.getUser(comment.author_id);
            comment.author = user.username;
            setAuthorData(true);
        }
        getAuthorData();
    })
    return (
        <div className="ActivityComments">
            {authorData
            ?
            <div className="ActivityComments-comment">
                { formShown
                ?
                <EditCommentForm comment={comment} toggleForm={toggleForm}/>
                :
                <div>
                    <div className="ActivityComments-comment-header">
                        <div>
                            <p className="ActivityComments-author">{comment.author} 
                            <span className="ActivityComments-date"> {comment.created_at.slice(0,15)}</span>
                            </p> 
                        </div>  
                        <div>
                            {comment.author_id === currentUserID && <i className="far fa-edit" onClick={toggleForm}></i>  }
                            {comment.author_id === currentUserID && <i className="far fa-trash-alt"></i> }
                        </div>
                    </div>
                    <p className="ActivityComments-body">{comment.body}</p>
                </div>
                }
                
                
            </div>
            :
            <p>Loading...</p>}
        </div>
    )
}

export default ActivityComments;