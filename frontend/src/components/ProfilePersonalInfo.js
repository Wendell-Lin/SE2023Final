import React, { useState, useEffect } from "react";
import "./ProfilePersonalInfo.css";
import { useCookies } from "react-cookie";
import profileService from "../services/profileService";
import { useNavigate } from 'react-router-dom';
import { isDisabled } from "@testing-library/user-event/dist/utils";

// photo
function PersonalInfo() {
  const [cookies] = useCookies();
  const  navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const [succeedMsg, setSucceedMsg] = useState("");
  const [isSentEmail, setIsSentEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPasswordInput] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [userInfoData, setUserInfo] = useState({
    name: "",
    email: "",
    notification: false,
    userImg: "images/Image_placeholder.png",
    accessToken: "",
  });
  // update Form Data

  // GET User profile
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    console.log("Load Profile");
    try {
      const responseData = await profileService.getProfile(cookies);
      console.log("Successfully get profile");
      setUserInfo({
        name: responseData.username,
        email: responseData.email,
        notification: responseData.notifOn,
        userImg:
          responseData.image === null
            ? "images/Image_placeholder.png"
            : responseData.image,
        accessToken: cookies.accessToken,
      });
      setIsSentEmail(responseData.email)
      setFormData(initFormData)
      
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

  const initFormData = {
    name: "",
    email: userInfoData.email, // unchanged
    notification: userInfoData.notification, // unchanged
    userImg: userInfoData.userImg, // unchanged
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };

  useEffect(() => {
    console.log("Set Successd msg");
  }, [setSucceedMsg]);

  useEffect(() => {
    console.log("Set Form Data");
  }, [setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  // click email
  const [editInfo, setEditInfo] = useState(false);
  function sentEditInfo() {
    setEditInfo((prevEditInfo) => !prevEditInfo);
  }

  const handleCheckboxChange = (e) => {
    setIsSentEmail(e.target.checked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      notification: !isSentEmail,
    }));
  };


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
      // console.log("load")
    }
  };
  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  // Change User Profile
  // Use PUT
  const handleSubmit_info = async (event) => {
    event.preventDefault();
    const updatedProfileData = {
      name: formData.name || userInfoData.name,
      notification: formData.notification,
      userImg: selectedImage || userInfoData.image,
    }
    // console.log(updatedProfileData)
    try {
      const responseData = await profileService.updateProfile(cookies, updatedProfileData);
      console.log("Successfully update profile");
      console.log(formData);
      setFormData(initFormData);
      setSucceedMsg("Successfully Edit Profile");
      if( (updatedProfileData.name !== userInfoData.name) && (updatedProfileData.name !== ""))
      {
        navigate("/login");
      }

    } catch (error) {
      console.log("Update Profile FAIL");
      console.log(error)
      // if (error.response) {
      //   const { status, data } = error.response;
      //   if (status === 500) {
      //     console.log("Internal Server Error");
      //   } else if (status === 401) {
      //     console.log("Unauthorized");
      //     console.log(error.message);
      //   }
      // }
    }
  };

  // const handleSubmit_info = (event) => {
  //   event.preventDefault();
  //   setSucceedMsg("Successfully Edit Profile");
  //   console.log(formData);
  //   setUserInfo({
  //     name: formData.name,
  //     email: userInfoData.email, // unchanged
  //     notification: formData.notification,
  //     userImg: formData.userImg,
  //   });

  //   setFormData(initFormData);
  // };

  // Forgot password
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleForgotPasswordClick = (event) => {
    event.preventDefault();
    setShowForgotPassword(true);
    setModalTitle("Forgot Password");
    setModalContent("");
    setIsModalOpen(true);
  };

  // Password
  // Input Password
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      oldpassword: e.target.value,
    }));
  };

  // new和confirm在輸入的時候就進行比對
  const handleNewPasswordChange = (e) => {
    setNewPasswordInput(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      newpassword: e.target.value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      confirmpassword: e.target.value,
    }));
    console.log("new and confirm")
   
   
  };
  useEffect(()=>{
    console.log(newpassword !== confirmpassword)
    setIsSubmitDisabled(newpassword !== confirmpassword);
  }, [confirmpassword])

 

  // Change Password
  const handleSubmit = async (event) => {
    event.preventDefault();
    // PUT user info(由後端判斷是否正確)
    try {
      console.log(oldpassword)
      console.log(newpassword)
        const responseData = await profileService.updatePwd(cookies, oldpassword, newpassword);
        setSucceedMsg("Successfully Change Password");

    } catch (error) {
      console.log("Change Password FAIL");
      console.log(error.response)
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          console.log("Internal Server Error");
        } else if (status === 401) {
          console.log("Bad credentials");
          console.log(error.message);
        }
      }
    }
      // console.log("Current data");
      // console.log(userInfoData); // 這邊還是舊資料
      // console.log("Edit data");
      // console.log(formData);
      setFormData(initFormData);
    
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // PUT user info(由後端判斷是否正確)
  // if (oldpassword === userInfoData.password) {
  //   if (newpassword === confirmpassword) {
  //     setSucceedMsg("Successfully Change Password");
  //   } else {
  //     setSucceedMsg("New password and confirm password do not match");
  //     console.log("new and confirm error");
  //   }
  // } else {
  //   setSucceedMsg("Incorrect old password");
  // }

  //   setUserInfo({
  //     name: userInfo.name,
  //     email: userInfo.email, // unchanged
  //     notification: userInfo.notification,
  //     userImg: userInfo.userImg,
  //     password: newpassword,
  //   });
  // console.log({selectedImage})
  // console.log(userInfoData)
  // console.log(isSentEmail)
  // console.log(initFormData)
  // console.log(isSubmitDisabled)
  return (
    <>
      {succeedMsg && (
        <div className="modal-backdrop">
          <div className="success-msg">
            <h2>{succeedMsg}</h2>
            <button
              className="close-button"
              onClick={() =>
                setTimeout(() => {
                  setSucceedMsg("");
                }, 100)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="profile">
        {/* Change Name and Notification */}
        <form className="form" onSubmit={handleSubmit_info}>
          <div className="edit-profile">Edit Personal Information</div>
          <div className="profile-picNname">
            <div className="picture_frame">
              <div className="picture">
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <img
                  src={selectedImage || userInfoData.userImg }
                  name="userImg"
                  alt="Selected Photo"
                  style={{ cursor: "pointer" }}
                  onClick={handleImageClick}
                />
              </div>
              <div className="name-email">
                <div className="user-name">{userInfoData.name}</div>
                <div className="user-email">{userInfoData.email}</div>
              </div>
            </div>
          </div>

          <div className="info-col">
            <label className="info-title">Name</label>
            <input
              type="text"
              name="name"
              placeholder={userInfoData.name}
              value={formData.name}
              onChange={handleInputChange}
              
            />
            <div className="info-title">Notification</div>
            <div className="sent-email-margin">
              <input
                type="checkbox"
                name="notification"
                checked={isSentEmail}
                onChange={handleCheckboxChange}
              />
              <div className="sent-email">Email</div>
            </div>
            <div className="sent-edit">
              <button type="submit" onClick={sentEditInfo} className="button">
                Edit Profile
              </button>
            </div>
          </div>
        </form>

        <form className="form" onSubmit={handleSubmit}>
          <div className="edit-profile">Change Password</div>

          <div className="info-col">
            {/* Change Password */}
            <label className="info-title">Current Password</label>
            <input
              type="password"
              name="oldpassword"
              placeholder="Current Password"
              value={formData.oldpassword}
              required
              onChange={handleOldPasswordChange}
            />

            <label className="info-title">New Password</label>
            <input
              type="password"
              name="newpassword"
              placeholder="New Password"
              value={formData.newpassword}
              required
              onChange={handleNewPasswordChange}
            />

            <label className="info-title">Confirm password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm password"
              value={formData.confirmpassword}
              required
              onChange={handleConfirmPasswordChange}
            />
            <div className="text-danger">{isSubmitDisabled? "Confirm password is Not Matched": ""}</div>
            <div className="sent-edit">
              <button
                type="submit"
                onClick={handleInputChange}
                className="button"
                disabled={isSubmitDisabled}
              >
                Change Password
              </button>
              {/* <div className="info-col"> */}
              <a
                href="#forgot-password"
                className="forgot-password"
                onClick={handleForgotPasswordClick}
              >
                forgot password
              </a>
              {/* </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PersonalInfo;
