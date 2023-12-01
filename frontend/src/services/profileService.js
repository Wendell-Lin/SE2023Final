import axios from 'axios';
import config from './apiConfig.json';

const API_URL = config.API_URL;

const login = async (email, password) => {
    const response = await axios.post(API_URL + '/auth/signin', { 
        usernameOrEmail: email,
        password: password
    });
    return response.data;
};

const register = async (username, email, password, role) => {
    const response = await axios.post(API_URL + '/auth/signup', {
      username,
      email,
      password,
      role
    });
    return response.data;
};
  
const resetPassword = async (email) => {
    const response = await axios.post(`${API_URL}/users/resetPwdWithNewPwd`, {}, {
      params: { email }
    });
    return response.data;
};
  
export default {
    login,
    register,
    resetPassword
};