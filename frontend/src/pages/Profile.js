import React, { useState, useEffect } from "react";
import "./Profile.css";
import PersonalInfo from "../components/ProfilePersonalInfo";
import ProfileItemList from "../components/ProfileItemList";
import FakeData from "./FakeData.json";
import { useCookies } from "react-cookie";
import profileService from "../services/profileService";

function Profile(props) {

  //------------------- User Info----------------------
  // GET from Fake Data
  // const [userInfo, setUserInfo] = useState(FakeData.user)

  const [cookies] = useCookies();
  console.log(cookies);

  // Load with only cookie
  // const userInfo = {
  //   name: cookies.username,
  //   email: cookies.user.email,
  //   notification: false,
  //   userImg: "images/Image_placeholder.png",
  //   accessToken: cookies.accessToken,
  // }

  // GET profile
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    notification: false,
    userImg: "images/Image_placeholder.png",
    accessToken: "",
  });
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    console.log('Load Profile')
    try {
      const responseData = await profileService.getProfile(cookies);
      console.log("Successfully get profile");
      setUserInfo({
        name: responseData.username,
        email: responseData.email,
        notification: responseData.notifOn,
        userImg:
          responseData.image === undefined
            ? "images/Image_placeholder.png"
            : responseData.image,
        accessToken: cookies.accessToken,
      });
    } catch (error) {
      console.log("Get profile FAIL");
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          console.log("Internal Server Error");
        } else if (status === 401) {
          console.log("Unauthorized");
          console.log(error.message);
        }
      }
    }
  };
  console.log(userInfo)

  //------------------- Food Item----------------------
  const [filteredItems, setFilteredItems] = useState(FakeData.savedItems);
  const [uploadedItems, setUploadedItems] = useState(FakeData.uploadedItems);

  useEffect(() => {
    document.body.style.backgroundColor = "#666D5D"; // Set your desired color

    return () => {
      document.body.style.backgroundColor = null; // Reset to default or another color
    };
  }, []);

  //------------------- Food Item----------------------

  return (
    <>
      <div className="profile_container">
        <div className="profile_allInfo">
          <div className="userInfo_column">
            <PersonalInfo />
          </div>

          <div className="ItemList_column">
            <ProfileItemList
              filteredItems={filteredItems}
              uploadedItems={uploadedItems}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
