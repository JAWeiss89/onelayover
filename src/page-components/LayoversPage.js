import React, {useEffect, useState} from 'react';
import OnelayoverAPI from '../onelayoverAPI';
import LayoverCard from  '../components/LayoverCard';
import '../styles/LayoversPage.css';

const LayoversPage = () => {
    const [layovers, setLayovers] = useState(null);
    const [filteredLayovers, setFilteredLayovers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function getLayovers() {
            let layovers = await OnelayoverAPI.getLayovers();
            console.log({layovers}); 
            setLayovers(layovers);
            setFilteredLayovers(layovers);
        }
        getLayovers();
    }, [])

    const handleChange = (e) => {

        setFilteredLayovers(layovers.filter((layover) => {
            return layover.layover_code.includes(e.target.value) 
            || layover.city_name.toLowerCase().includes(e.target.value.toLowerCase())
            || layover.country_name.toLowerCase().includes(e.target.value.toLowerCase());
        }))
        setSearchTerm(e.target.value);
        
    }

    return (
        <div className="LayoversPage full-width">
            <h1>Layovers</h1>
            <div className="LayoversPage-search">
                <input type="text" placeholder="e.g. CDG" onChange={handleChange} value={searchTerm}/>
                <button><i className="fas fa-search"></i></button>
            </div>
            {filteredLayovers ?
            <div className="LayoversPage-layovers">
                {filteredLayovers.map((layover) => {
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