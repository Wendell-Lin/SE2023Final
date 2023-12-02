import axios from 'axios';
import config from './apiConfig.json';

const API_URL = config.API_URL;

const getProfile = async (cookies) => {
    const response = await axios.get(API_URL + '/user/profile', item, {
        headers: {
            'Authorization': `Bearer ${cookies.accessToken}`,
        },
    });
    return response.data;
}

export default {
    getProfile,
};