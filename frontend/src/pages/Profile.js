import React, {useState} from "react";
import './Profile.css';

// function sentEmailinitial(){
//     console.log('Initial')
//     return 0
// }
//() => sentEmailinitial() 如果初始化是要用function來進行，要用arrow functoin 這樣每次只會初始化一次

function Profile(props) {

    const [editInfo, setEditInfo] = useState(false)
    function sentEditInfo(){
        setEditInfo(editInfo => !editInfo)
    }
    const [isSavedItem, setIsSavedItem] = useState(false)
    function showSavedItem(){
        setIsSavedItem(isSavedItem => !isSavedItem)
    }    
    // console.log(sentEmail)
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="column">
            <div className="profile">
              <div className="profile-pic">
                <div className="div-5">
                  <div className="column-2">
                    <img
                      src="images/Image_placeholder.png"
                    />
                  </div>
                  <div className="column-3">
                    <div className="div-6">
                      <div className="div-7">Tom Tsai</div>
                      <div className="div-8">r12345678@ntu.edu.tw</div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="info-col">
              <form>
                <label className="info-title">Name</label>
                <input 
                    type="text"
                    id="name" 
                    placeholder="Tom Tsai" required
                />
                <div className="info-title">Notification</div>
                <div className="div-14">
                <input 
                    type="checkbox"
                    id="isSentEmail" 
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
                    id="newpassword" 
                    placeholder="New Password (again)" required
                />  
              </form>
               
                <div className="div-23">
                    <button onClick={sentEditInfo} className="button" type='submit'> Change Password</button>                    
                </div>
              </div>
            </div>
          </div>




          <div className="column-4">
            <div className="div-25">
              <div className="div-26">
                <button onClick={showSavedItem} className={ isSavedItem === true ? "item-list-shown": "item-list-unshown"} type='submit'> Saved Items</button>
                <button onClick={showSavedItem} className={ isSavedItem === false ? "item-list-shown": "item-list-unshown"} type='submit'> Uploaded Items</button>                                        
                <div className="div-29">
                  <img
                    loading="lazy"
                    src="images/add_icon.png"
                    className="img-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
  );
}







export default Profile