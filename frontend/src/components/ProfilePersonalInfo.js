import React, { useState, useEffect } from "react";
import "./ProfilePersonalInfo.css";

// photo
function PersonalInfo({ userInfo }) {
  // update Form Data
  // Form Data init
  const initFormData = {
    name: "",
    email: userInfo.email, // unchanged
    notification: userInfo.notification, // unchanged
    userImg: userInfo.userImg, // unchanged
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };

  const [userInfoData, setUserInfo] = useState(userInfo);
  const [formData, setFormData] = useState(initFormData);
  const [succeedMsg, setSucceedMsg] = useState("");
  const [isSentEmail, setIsSentEmail] = useState(userInfo.notification);
  const [getNewPassword, setNewPassword] = useState("");

  useEffect(() => {
    console.log("New Password Updated");
  }, [setNewPassword]);

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

  // 有問題
  // Image
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // 後端判斷密碼
  // Change User Profile
  const handleSubmit_info = (event) => {
    event.preventDefault();
    setSucceedMsg("Successfully Edit Profile");
    console.log(formData);
    setUserInfo({
      name: formData.name,
      email: userInfo.email, // unchanged
      notification: formData.notification,
      userImg: formData.userImg,
    });

    setFormData(initFormData);
  };

  // Change Password
  // 要再加個forget password
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Old");
    console.log(formData.oldpassword);
    console.log("New");
    console.log(userInfoData.password);
    if (formData.oldpassword === userInfoData.password) {
      if (formData.newpassword === formData.confirmpassword) {
        setNewPassword(formData.newpassword);
        console.log("password update successfully");
        setSucceedMsg("Successfully Change Password");
      } else {
        setSucceedMsg("New password and confirm password do not match");
        setNewPassword("");
        console.log("new and confirm error");
      }
    } else {
      setSucceedMsg("Incorrect old password");
      setNewPassword("");
      console.log("not match old");
    }

    console.log(formData);
    setUserInfo({
      name: userInfo.name,
      email: userInfo.email, // unchanged
      notification: userInfo.notification,
      userImg: userInfo.userImg,
      password: getNewPassword,
    });
    // 更新後的值
    console.log({ getNewPassword });
    console.log(userInfoData.password);

    setFormData(initFormData);
    console.log(formData);
  };

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
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : userInfoData.userImg
                  }
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
              required
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
              onChange={handleInputChange}
            />

            <label className="info-title">New Password</label>
            <input
              type="password"
              name="newpassword"
              placeholder="New Password"
              value={formData.newpassword}
              required
              onChange={handleInputChange}
            />

            <label className="info-title">New Password (again)</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="New Password (again)"
              value={formData.confirmpassword}
              required
              onChange={handleInputChange}
            />
            <div className="sent-edit">
              <button type="submit" onClick={sentEditInfo} className="button">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PersonalInfo;
