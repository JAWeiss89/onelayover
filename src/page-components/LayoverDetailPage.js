import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import ActivityCard from '../components/ActivityCard';
import AddActivityForm from '../components/AddActivityForm';
import '../styles/LayoverDetailPage.css';

const LayoverDetailPage = () => {
    const {layover_code} = useParams();
    const [layover, setLayover] = useState(null);
    const [activities, setActivities] = useState(null);
    const [formShown, setFormShown] = useState(false);

    const toggleForm = () => {
        formShown ? setFormShown(false) : setFormShown(true);
    }

    useEffect(() => {
        async function getLayover() {
            let layover = await OnelayoverAPI.getLayover(layover_code);
            setLayover(layover);
        }
        async function getActivities() {
            let activities = await OnelayoverAPI.getActivities(layover_code);
            setActivities(activities);
            console.log(activities)
        }
        getLayover();
        getActivities();
    }, [layover_code]);

    return (
        <div className="LayoverDetailPage">
            {layover
            ? 
            <div className="LayoverDetailPage-page-content">
                <Link to={"/layovers"}><h2><i className="fas fa-chevron-left"></i> LAYOVERS</h2></Link>
                <h1>{layover.city_name}</h1>
                <img className="LayoverDetailPage-main-image" src={layover.main_img_url} alt={`${layover.city_name}, ${layover.country_name}`} />
                <p><em>{layover.description}</em></p>

                <div className="LayoverDetailPage-facts-section">
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-dollar-sign"></i>
                        <p>Currency: <span style={{textTransform:"uppercase"}}>{layover.currency}</span></p>
                    </div>
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-comments"></i>
                        <p>Language: </p>
                    </div>
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-flag"></i>
                        <p>Country: <span>{layover.country_name}</span></p>
                    </div>
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-bell"></i>
                        <p>Police Number: 105</p>
                    </div>
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-ambulance"></i>
                        <p>Ambulance Number: 116</p>
                    </div>
                    <div className="LayoverDetailPage-facts-icon">
                        <i className="fas fa-ambulance"></i>
                        <p>Ambulance Number: 116</p>
                    </div>
                </div>

                <div className="LayoverDetailPage-activities-section">
                    <h4>Activities:</h4>
                    
                    <button onClick={toggleForm}>Add Activity</button>
                    {formShown
                    ?
                    <AddActivityForm />
                    :
                    <div>
                    </div>}

                    {activities
                    ?
                    <div className="LayoverDetailPage-activities">
                    {activities.map((activity) => {
                        return <ActivityCard layover={layover} activity={activity} key={activity.id}/>
                    })}
                    </div>
                    :
                    <p>Loading Activities...</p>}
                </div>
            </div>
            : 
            <h2>Loading...</h2>}
        </div>
    )
}

export default LayoverDetailPage;