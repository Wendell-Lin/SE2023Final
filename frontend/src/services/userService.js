import axios from 'axios';
import config from './apiConfig.json';

const API_URL = config.API_URL;

const getFollow = async (cookies) => {
    const response = await axios.get(API_URL + '/user/follow-item', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.accessToken}`,
        },
        data: {},
    });
    return response.data;
}

const followItem = async (itemId, follow, cookies) => {
    const response = await axios.put(API_URL + '/user/follow-item', {
        itemId: itemId,
        follow: follow,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.accessToken}`,
        },
        data: {},
    });
    return response.data;
}


export default {
    getFollow,
    followItem,
};