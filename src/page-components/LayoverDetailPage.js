import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import ActivityCard from '../components/ActivityCard';
import '../styles/LayoverDetailPage.css';

const LayoverDetailPage = () => {
    const {layover_code} = useParams();
    const [layover, setLayover] = useState(null);
    const [activities, setActivities] = useState(null);

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
                <h2>{layover.city_name}</h2>
                <img className="LayoverDetailPage-main-image" src={layover.main_img_url} alt={`${layover.city_name}, ${layover.country_name}`} />
                <p><em>{layover.description}</em></p>

                <div className="LayoverDetailPage-facts-section">
                    <p><i class="fas fa-dollar-sign"></i> Currency: <span style={{textTransform:"uppercase"}}>{layover.currency}</span></p>
                    <p><i class="fas fa-comments"></i> Language: </p>
                    <p><i class="fas fa-flag"></i> Country: <span>{layover.country_name}</span></p>
                    <p><i class="fas fa-bell"></i> Police Number: 105</p>
                    <p><i class="fas fa-ambulance"></i> Ambulance Number: 116</p>
                    <p></p>
                </div>

                <div className="LayoverDetailPage-activities-section">
                    <h4>Activities:</h4>
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