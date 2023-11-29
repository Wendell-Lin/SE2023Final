import axios from 'axios';
import config from './apiConfig.json';

const API_URL = config.API_URL;

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'auth/signin', { 
        usernameOrEmail: email,
        password: password
    });
    return response.data;
};

export default {
    login,
};