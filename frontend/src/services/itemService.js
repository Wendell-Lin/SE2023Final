import axios from 'axios';
import config from './apiConfig.json';
import { useCookies } from 'react-cookie';

const API_URL = config.API_URL;

const upload = async (item, cookies) => {;
    const response = await axios.post(API_URL + '/items/createItem', item, {
        headers: {
            'Authorization': `Bearer ${cookies.accessToken}`,
        },
    });
    return response.data;
}

export default {
    upload,
};