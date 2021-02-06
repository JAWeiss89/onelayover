import React from "react";
import { Link } from 'react-router-dom';
import "../styles/LayoverCard.css";

const LayoverCard = ( {layover} ) => {
    return (
        < Link to={`/layovers/${layover.layover_code}`}>
        <div className="LayoverCard">
            <p className="LayoverCard-code">{layover.layover_code}</p>
            <img src={layover.thumbnail_url} alt={`{layover.city_name}, {layover.country_name}`}/>
            <p className="LayoverCard-city">{layover.city_name}, {layover.country_name}</p>
        </div>
        </Link>

    )
}

export default LayoverCard;