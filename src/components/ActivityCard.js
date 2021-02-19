import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/ActivityCard.css';

const ActivityCard = ({layover, activity}) => {
    const [activityPhoto, setActivityPhoto] = useState(null);
    useEffect(() => {
        async function getActivity() {
            let foundActivity = await OnelayoverAPI.getActivity(layover.layover_code, activity.id);
            if (foundActivity.photos) {
                setActivityPhoto(foundActivity.photos[0]);
            } 
        }
        getActivity();
    }, [activity.id, layover.layover_code]);

    return (
        <div className={`ActivityCard activity-type-${activity.type_id}`} >
            <div className="ActivityCard-image">
                <Link to={`/layovers/${layover.layover_code}/activities/${activity.id}`}>
                { activityPhoto
                ?
                <img alt={activityPhoto.caption} style={{width: '150px' }} src={activityPhoto.url} />
                :
                <img alt={activity.title} style={{width: '150px' }} src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                }
                </Link>
            </div>
            <div className="ActivityCard-text">
                <Link to={`/layovers/${layover.layover_code}/activities/${activity.id}`}>
                    <p className="ActivityCard-title">{activity.title} <span className="ActivityCard-rating"></span></p>
                </Link>
                <p className="ActivityCard-description">{activity.description}</p>
            </div>

        </div> 
    )
}

export default ActivityCard;