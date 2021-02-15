import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import AddPhotoForm from '../components/AddPhotoForm';
import AddCommentForm from '../components/AddCommentForm';
import ActivityComments from '../components/ActivityComments';
import ActivityPhotos from '../components/ActivityPhotos';

const ActivityDetailPage = () => {
    const {layover_code, id} = useParams();
    const [activity, setActivity] = useState(null);
    const [formShown, setFormShown] = useState(false);
    const [commentFormShown, setCommentFormShown] = useState(false);
 
    const toggleForm = () => {
        formShown ? setFormShown(false) : setFormShown(true);
    }

    const toggleCommentForm = () => {
        commentFormShown ? setCommentFormShown(false) : setCommentFormShown(true);
    }

    useEffect(() => {
        async function getActivity() {
            let activity = await OnelayoverAPI.getActivity(layover_code, id);
            
            setActivity(activity);

            console.log({activity})
        }
        getActivity();
    }, [id, layover_code]);
    return (
        <div className="ActivityDetailPage">
            {activity
            ?
            <div>
                <h1>{activity.title}</h1>
                <p>{activity.address} <i className="fas fa-map-marker-alt"></i></p>
                <button onClick={toggleForm}>Add Photos</button>
                {formShown
                    ?
                    <AddPhotoForm />
                    :
                    <div>
                    </div>
                }
                { activity.photos
                ?
                <ActivityPhotos activity={activity} />
                :
                <img alt={activity.title} style={{width: '100%'} } src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                }

                <p className="ActivityDetailPage-description">{activity.description}</p>
                <p>{activity.body}</p>

                <h3>Comments: </h3>
                <button onClick={toggleCommentForm}>Add Comment</button>
                {commentFormShown
                    ?
                    <AddCommentForm activity={activity} />
                    :
                    <div></div>
                }
                {activity.comments && activity.comments.map((comment) => {
                    return (
                        <ActivityComments comment={comment} key={comment.id} />
                    )
                })}
            </div>

            :
            <h1>Loading activity...</h1>
            }
        </div>
    )
}

export default ActivityDetailPage;