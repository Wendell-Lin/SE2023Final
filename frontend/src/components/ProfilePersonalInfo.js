import React, {useState} from "react";
import './ProfilePersonalInfo.css';
import { useNavigate } from 'react-router-dom';

function PersonalInfo({userInfo}) {

  const [editInfo, setEditInfo] = useState(false)  
  const navigate = useNavigate() 

  const [isSentEmail, setIsSentEmail] = useState(userInfo.notification);
  function sentEditInfo() {
    setEditInfo((prevEditInfo) => !prevEditInfo);
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };


  // -----pop up
  // const [userInfo, setUserInfo] = useState();
  const [formData, setFormData] = useState(userInfo);
  const [succeedMsg, setSucceedMsg] = useState('');
  const handleCheckboxChange = (e) => {
    setIsSentEmail(e.target.checked);
  };

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleUpload = (event) => {
    event.preventDefault();
    console.log(userInfo);
    // 模拟上传成功
    setSucceedMsg("Successfully Edit User Info");
    // 在这里执行将数据发送到服务器的逻辑
  };
  
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
              src={selectedFile ? URL.createObjectURL(selectedFile) : userInfo.userImg}
              alt="Selected Photo"
              style={{ cursor: 'pointer' }}
              onClick={handleImageClick}
            />
            </div>
            <div className="name-email">
              <div className="user-name">{userInfo.name}</div>
              <div className="user-email">{userInfo.email}</div>
            </div>
          </div>
        </div>

        
        <div className="info-col">
        <form  onSubmit={handleUpload}>
          <label className="info-title">Name</label>
          <input 
              type="text"
              name="name" 
              placeholder={userInfo.name} 
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
              type="text"
              name="oldpassword" 
              placeholder="Current Password" 
              required
              onChange={handleInputChange} 
          />

          <label className="info-title">New Password</label>
          <input 
              type="text"
              name="newpassword" 
              placeholder="New Password" 
              required
              onChange={handleInputChange} 
          />  


          <label className="info-title">New Password (again)</label>
          <input 
              type="text"
              name="newpassword2" 
              placeholder="New Password (again)" 
              required
              onChange={handleInputChange} 
          />  
          <div className="sent-edit">
              <button type="submit" onClick={sentEditInfo} className="button"> Finished </button>                    
          </div>
        </form>
          

        </div>
      </div>


      </>
  );
}







export default PersonalInfo