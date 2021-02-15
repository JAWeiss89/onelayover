import React, {useEffect, useState} from 'react';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/ActivityComments.css';

const ActivityComments = ( {comment} ) => {
    const [authorData, setAuthorData] = useState(false);
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
                <p className="ActivityComments-author">{comment.author}: </p>
                <p className="ActivityComments-body">{comment.body}</p>
            </div>
            :
            <p>Loading...</p>}
        </div>
    )
}

export default ActivityComments;