import React, {useEffect, useState} from 'react';
import OnelayoverAPI from '../onelayoverAPI';
import LayoverCard from  '../components/LayoverCard';
import '../styles/LayoversPage.css';

const LayoversPage = () => {
    const [layovers, setLayovers] = useState(null);

    useEffect(() => {
        async function getLayovers() {
            let layovers = await OnelayoverAPI.getLayovers();
            layovers.reverse(); 
            setLayovers(layovers);
        }
        getLayovers();
    }, [])


    return (
        <div className="LayoversPage">
            <h1>Layovers</h1>
            <div className="LayoversPage-search">
                <input type="text" placeholder="e.g. CDG"/>
                <button><i class="fas fa-search"></i></button>
            </div>
            {layovers ?
            <div className="LayoversPage-layovers">
                {layovers.map((layover) => {
                    return (
                        < LayoverCard key={layover.layover_code} layover={layover}/>
                    )
                })}
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default LayoversPage;