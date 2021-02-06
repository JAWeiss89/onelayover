import React from 'react';
import '../styles/ActivityCard.css';

const ActivityCard = ({activity}) => {
    return (
        <div className={`ActivityCard activity-type-${activity.type_id}`} >
            <div className="ActivityCard-image">
                <img style={{width: '150px  '} } src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
            </div>
            <div className="ActivityCard-text">
                <p className="ActivityCard-title">{activity.title} <span className="ActivityCard-rating">✈️✈️✈️✈️</span></p>
                <p className="ActivityCard-description">{activity.description}</p>
            </div>

        </div> 
    )
}

export default ActivityCard;