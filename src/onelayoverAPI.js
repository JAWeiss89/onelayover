import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class OnelayoverAPI {
    static async request(endpoint, verb='get', data={}) {
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
        let {user} = await this.request(`users/${userID}`);
        return user;
    }

    static async getLayovers() {
        let res = await this.request('layovers/');
        return res.layovers;
    }

    static async getLayover(layoverCode) {
        let res = await this.request(`layovers/${layoverCode}/`);
        return res.layover;
    }

    static async getActivities(layoverCode) {
        let res = await this.request(`layovers/${layoverCode}/activities`);
        return res.activities;
    }

    static async getActivity(layoverCode, activityID) {
        let res = await this.request(`layovers/${layoverCode}/activities/${activityID}`);
        let commentsResponse = await this.request(`layovers/${layoverCode}/activities/${activityID}/comments`);
        let photosResponse = await this.request(`layovers/${layoverCode}/activities/${activityID}/photos`);
        if (commentsResponse && commentsResponse.comments) {
            res.activity.comments = commentsResponse.comments;
        }
        if (photosResponse && photosResponse.photos) {
            res.activity.photos = photosResponse.photos;
        }
        let activity = res.activity;
        console.log({activity})
        return activity;
    }

    static async postActivity(layoverCode, activityData) {
        // activityData must have the following: userID, activity, _token
        let res = await this.request(`layovers/${layoverCode}/activities`, 'post', activityData);
        return res.message;
    }

    static async postPhoto(layoverCode, activityID, photoData) {
        // photoData must have the following: userID, photo, _token
        let res = await this.request(`layovers/${layoverCode}/activities/${activityID}/photos`, 'post', photoData);
        return res.photo;
    }

    static async postComment(layoverCode, activityID, commentData) {
        // commentData must have the following: userID, comment, _token
        let res = await this.request(`layovers/${layoverCode}/activities/${activityID}/comments`, 'post', commentData);
        return res.comment;
    }

    static async editComment(commentID, commentData) {
        // commentData must have the following: userID, commnent, _token
        let res = await this.request(`layovers/layoverCode/activities/activityID/comments/${commentID}`, 'patch', commentData);
        return res.comment;
    }

    

}

export default OnelayoverAPI;