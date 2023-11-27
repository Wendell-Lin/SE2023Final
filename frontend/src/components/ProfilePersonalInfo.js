import React, {useState} from "react";
import './ProfilePersonalInfo.css';

// photo
function PersonalInfo({userInfo}) {

  // update Form Data
  const [userInfoData, setUserInfo] = useState(userInfo);
  const [formData, setFormData] = useState(userInfo);
  const [succeedMsg, setSucceedMsg] = useState('');
  const [isSentEmail, setIsSentEmail] = useState(userInfo.notification);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Submit
  const handleUpload = (event) => {
    event.preventDefault();
    console.log(formData);
    setSucceedMsg("Successfully Edit User Info");
    setUserInfo(formData)
    setFormData({
      name: "",
      email: userInfo.email, // unchanged
      notification: userInfoData.notification,
      userImg: userInfoData.userImg,
      oldpassword:"",
      newpassword:"",
      newpassword2:""
    })
  };

  // click email
  const [editInfo, setEditInfo] = useState(false)  
  
  function sentEditInfo() {
    setEditInfo((prevEditInfo) => !prevEditInfo);
  }
  const handleCheckboxChange = (e) => {
    setIsSentEmail(e.target.checked);
    setFormData(prevFormData => ({
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
    document.getElementById('fileInput').click();
  };

  // 比較密碼
  // const handlePasswordChange = () =>{
  //   const msg = ""
  //   if (formData.newpassword === formData.newpassword2){
  //     msg ="correct";
  //   }
  //   else{
  //     msg ="Please confirm your new password";
  //   }
      
  // }
  
  return (
    <>
    {succeedMsg && (
      <div className="modal-backdrop">
        <div className="success-msg">
          <h2>{succeedMsg}</h2>
          <button 
            className='close-button'
            onClick={() => setTimeout(() => {setSucceedMsg('')}, 100)}>Close</button>
        </div>
      </div>
    )}


      <div className="profile">
        <form onSubmit={handleUpload}>
        <div className="edit-profile">Edit Personal Information</div>
        <div className="profile-picNname">
          <div className="picture_frame">
            <div className="picture">
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : userInfoData.userImg}
              name="userImg"
              alt="Selected Photo"
              style={{ cursor: 'pointer' }}
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
                name="newpassword2" 
                placeholder="New Password (again)" 
                value={formData.newpassword2}
                required
                onChange={handleInputChange} 
            />  
            <div className="sent-edit">
                <button type="submit" onClick={sentEditInfo} className="button"> Finished </button>                    
            </div>
          
          

          </div>
        </form>
      </div>


      </>
  );
}







export default PersonalInfo