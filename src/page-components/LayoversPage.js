import React, {useEffect} from 'react';
import OnelayoverAPI from '../onelayoverAPI';

const LayoversPage = () => {
    useEffect(() => {
        async function getLayovers() {
            let layovers = await OnelayoverAPI.getLayovers();
            console.log(layovers);
        }
        getLayovers();
    }, [])


    return (
        <h4>This is the layovers page :DDD</h4>
    )
}

export default LayoversPage;