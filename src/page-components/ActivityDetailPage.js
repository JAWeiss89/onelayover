import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import AddPhotoForm from '../components/AddPhotoForm';
import AddCommentForm from '../components/AddCommentForm';
import ActivityComments from '../components/ActivityComments';
import ActivityPhotos from '../components/ActivityPhotos';
import "../styles/ActivityDetailPage.css";

const ActivityDetailPage = ( {notify} ) => {
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

            // console.log({activity})
        }
        getActivity();
    }, [id, layover_code]);
    return (
        <div className="ActivityDetailPage full-width">
            {activity
            ?
            <div>
                <Link to={`/layovers/${activity.layover_code}`}><h2><i className="fas fa-chevron-left"></i> {activity.layover_code}</h2></Link>
                <h1>{activity.title}</h1>
                <p className="ActivityDetailPage-address"><i className="fas fa-map-marker-alt"></i> {activity.address}</p>
                <div className="ActivityDetailPage-row">
                    <button className="ActivityDetailPage-addphotos" onClick={toggleForm}>Add Photos <i className="fas fa-camera-retro"></i></button>
                </div>
                
                {formShown
                    ?
                    <AddPhotoForm notify={notify} />
                    :
                    <div>
                    </div>
                }
                { activity.photos
                ?
                <ActivityPhotos activity={activity} />
                :
                <img alt={activity.title} style={{width: '100%'} } src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" />
                }

                <p className="ActivityDetailPage-description">{activity.description}</p>
                <p>{activity.body}</p>

                <h3>Comments: </h3>
                <div className="ActivityDetailPage-row">
                    <button className="ActivityDetailPage-addcomment" onClick={toggleCommentForm}>Add Comment</button>
                </div>
                <div className="ActivityDetailPage-comments">
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

            </div>

            :
            <h1>Loading activity...</h1>
            }
        </div>
    )
}

export default ActivityDetailPage;