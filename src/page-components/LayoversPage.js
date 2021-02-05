import React, {useEffect, useState} from 'react';
import OnelayoverAPI from '../onelayoverAPI';

const LayoversPage = () => {
    const [layovers, setLayovers] = useState(null);

    useEffect(() => {
        async function getLayovers() {
            let layovers = await OnelayoverAPI.getLayovers();
            console.log({layovers});
            setLayovers(layovers);
        }
        getLayovers();
    }, [])


    return (
        <div className="LayoversPage">
            {layovers ?
            <div className="LayoversPage-layovers">
                {layovers.map((layover) => {
                    return (
                        <div id={layover.layover_code}>
                        <h4>{layover.layover_code}</h4>
                        <p>{layover.city_name}, {layover.country_name}</p>
                        <img src={layover.thumbnail_url} alt={layover.city_name} style={{width:"120px"}}/>
                        </div>
                    )
                })}
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default LayoversPage;