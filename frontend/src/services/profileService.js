import axios from "axios";
import config from "./apiConfig.json";

const API_URL = config.API_URL;

const getProfile = async (cookies) => {
  const response = await axios.get(API_URL + "/user/profile", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
     "Authorization": `Bearer ${cookies.accessToken}`,
    },
    data: {},
  });
  return response.data;
};
const updateProfile = async (cookies, updatedProfileData) => {
    const response = await axios.put(
      API_URL + "/user/profile",
      updatedProfileData,
      {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
           "Authorization": `Bearer ${cookies.accessToken}`,
        },
      }
    );
    return response.data;
};

const updatePwd = async (cookies, oldPassword, newPassword) => {
    const response = await axios.post(
      API_URL + "/users/updatePassword?oldPassword="+oldPassword+"?newPassword="+newPassword,
      {},
      {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
           "Authorization": `Bearer ${cookies.accessToken}`,
        },
      }
    );
    return response.data;
};


export default {
  getProfile,
  updateProfile,
  updatePwd
};
