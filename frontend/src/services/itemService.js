import axios from 'axios';
import config from './apiConfig.json';

const API_URL = config.API_URL;

const upload = async (item, cookies) => {;
    const response = await axios.post(API_URL + '/items/createItem', item, {
        headers: {
            'Authorization': `Bearer ${cookies.accessToken}`,
        },
    });
    return response.data;
}

const getItemList = async () => {;
    const response = await axios.get(API_URL + '/items/getItems');
    return response.data;
};

const updateItem = async (itemData, cookies) => {;
    const response = await axios.put(API_URL + '/items/updateItem/' + itemData.itemId, itemData, 
    {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
           "Authorization": `Bearer ${cookies.accessToken}`,
        },
    });
    return response.data;
};

export default {
    upload,
    getItemList,
    updateItem
};