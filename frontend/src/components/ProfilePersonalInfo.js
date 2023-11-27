import React, {useState} from "react";
import './ProfilePersonalInfo.css';
function PersonalInfo({userInfo}) {

  const [editInfo, setEditInfo] = useState(false)   
  const [isSentEmail, setIsSentEmail] = useState(userInfo.notification);
  function sentEditInfo() {
    setEditInfo((prevEditInfo) => !prevEditInfo);
  }

  function handleCheckboxChange() {
    setIsSentEmail((prevIsSentEmail) => !prevIsSentEmail);
  }

//------------------- Food Item----------------------

  return (
    <>
      <div className="profile">
        <div className="profile-pic">
          <div className="div-5">
            <div className="column-2">
              <img
                src={userInfo.userImg}
              />
            </div>
            <div className="column-3">
              <div className="div-6">
                <div className="div-7">{userInfo.name}</div>
                <div className="div-8">{userInfo.email}</div>
              </div>
            </div>
          </div>
        </div>


        <div className="info-title">Edit Personal Information</div>
        <div className="info-col">
        <form>
          <label className="info-title">Name</label>
          <input 
              type="text"
              id="name" 
              placeholder={userInfo.name} required
          />
          <div className="info-title">Notification</div>
          <div className="div-14">
          <input 
              type="checkbox"
              id="isSentEmail" 
              checked={isSentEmail}
              onChange={handleCheckboxChange}
          />
          <div className="div-16">Email</div>
          </div>
          

          <label className="info-title">Current Password</label>
          <input 
              type="text"
              id="password" 
              placeholder="Current Password" required
          />

          <label className="info-title">New Password</label>
          <input 
              type="text"
              id="newpassword" 
              placeholder="New Password" required
          />  


          <label className="info-title">New Password (again)</label>
          <input 
              type="text"
              id="newpassword2" 
              placeholder="New Password (again)" required
          />  
        </form>
          
          <div className="div-23">
              <button onClick={sentEditInfo} className="button" type='submit'> Change Password</button>                    
          </div>
        </div>
      </div>


      </>
  );
}







export default PersonalInfo