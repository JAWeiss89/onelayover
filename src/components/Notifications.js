import React from 'react';
import '../styles/Notifications.css';

const Notifications = ( {notificationText, notify} ) => {
    const clear = () => {
        notify(null);
    }
    return (

        <div className="Notifications">
            <p>{notificationText}</p>
            <i onClick={clear} className="far fa-times-circle"></i>
        </div>
    )
};

export default Notifications;