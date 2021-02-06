import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import OnelayoverAPI from '../onelayoverAPI';
import '../styles/LayoverDetailPage.css';

const LayoverDetailPage = () => {
    const {layover_code} = useParams();
    const [layover, setLayover] = useState(null);
    
    useEffect(() => {
        async function getLayover() {
            let layover = await OnelayoverAPI.getLayover(layover_code);
            console.log({layover});
            setLayover(layover);
        }
        getLayover();
    }, []);

    return (
        <div className="LayoverDetailPage">
            {layover
            ? 
            <div>
                <h2>{layover.city_name}</h2>
                <img src={layover.main_img_url} alt={`${layover.city_name}, ${layover.country_name}`} />
                <p><em>{layover.description}</em></p>
                <p>Currency: <span style={{textTransform:"uppercase"}}>{layover.currency}</span></p>
            </div>
            : 
            <h2>Loading...</h2>}
        </div>
    )
}

export default LayoverDetailPage;