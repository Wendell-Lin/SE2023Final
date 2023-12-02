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
      {
        username: updatedProfileData.name,
        image: updatedProfileData.userImg,
        notifOn: updatedProfileData.notification,
      },
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
      API_URL + "/user/updatePassword?oldPassword="+ oldPassword + "&newPassword=" + newPassword,{},
      // API_URL + "/user/updatePassword",{
      //   params: {oldPassword, newPassword},
      // },
      {
        headers: {
            "Content-Type": "application/json",
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
