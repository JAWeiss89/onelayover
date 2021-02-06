import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class OnelayoverAPI {
    static async request(endpoint, verb, data={}) {
        const _token = localStorage._token;
        if (_token) {
            data._token = _token;
        }
        console.debug("API Call:", endpoint, verb, data)
        try {
            if(_token) {
                return (await axios({
                    method: verb,
                    url: `${BASE_URL}/${endpoint}`,
                    data : data,
                    headers: {_token}
            })).data 
            } else {
                return (await axios({
                    method: verb,
                    url: `${BASE_URL}/${endpoint}`,
                    data : data
                })).data 
            }
            
        } catch(err) {
            console.error("API Error:", err.response);
        }
    }

    static async signUp(userData) {
        let {token, userID} = await this.request('users/', 'post', userData);
        return {token, userID};
    }

    static async login(userData) {
        let {token, userID} = await this.request('login/', 'post', userData);
        return {token, userID}
    }

    static async getUser(userID) {
        let {user} = await this.request(`users/${userID}`, 'get');
        return user;
    }

    static async getLayovers() {
        let res = await this.request('layovers/','get');
        return res.layovers;
    }

    static async getLayover(layoverCode) {
        let res = await this.request(`layovers/${layoverCode}/`, 'get');
        return res.layover;
    }

    

}

export default OnelayoverAPI;