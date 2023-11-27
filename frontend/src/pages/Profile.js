import React, {useState, useEffect} from "react";
import './Profile.css';
import ItemList from '../components/ItemList';
import ItemDetail from '../components/ItemDetail';

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

    const [userInfo, setUserInfo] = useState([])
    useEffect(() => {
      const initialUser = {
        name: "Tom Tsai", 
        email: "r1121111@ntu.edu.tw",
        notification: false,
        userImg: "images/Image_placeholder.png",
      };
      setUserInfo(initialUser);
    }, []); // <-- 添加空list，確保只會render once

    const [isSentEmail, setIsSentEmail] = useState(userInfo.notification);
    function sentEditInfo() {
      setEditInfo((prevEditInfo) => !prevEditInfo);
    }

    function handleCheckboxChange() {
      setIsSentEmail((prevIsSentEmail) => !prevIsSentEmail);
      // 这里可以添加其他处理逻辑，例如更新数据库中的用户信息
    }

    //------------------- Food Item----------------------
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [uploadedItems, setUploadedItems] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = "#666D5D"; // Set your desired color
    
        return () => {
          document.body.style.backgroundColor = null; // Reset to default or another color
        };
      }, []);

    useEffect(() => {
        // Fetch or initialize items here
        // This should be an array of objects, not just strings
        const initialItems = [
            { 
                name: 'A bag of cookies', 
                amount: 5, 
                location: 'Library', 
                description: 'I just got it as a gift, but I am losingI just got it as a gift, but I am losing weight.... \nAnyone who is interested in it...\n JUST TAKE IT!!!',
                expirationTime: '2023/10/09 09:15',
                category: 'Snack',
                imageList: ['/images/log-decorative.png'],
            },
            { 
                name: '師大第一腿', 
                amount: 5, 
                location: '德田館', 
                description: '好吃',
                expirationTime: '2023/10/09 09:15', 
                category: '便當'
            },

            {},{},{}
            // ... more items
        ];
        // setItems(initialItems);
        setFilteredItems(initialItems);
    }, []);
    useEffect(() => {
      // Fetch or initialize items here
      // This should be an array of objects, not just strings
      const initialItems2 = [
          { 
              name: 'A bag of cookies', 
              amount: 5, 
              location: 'Library', 
              description: 'I just got it as a gift, but I am losingI just got it as a gift, but I am losing weight.... \nAnyone who is interested in it...\n JUST TAKE IT!!!',
              expirationTime: '2023/10/09 09:15',
              category: 'Snack',
              imageList: ['/images/log-decorative.png'],
          },
          { 
            name: '烤肉飯', 
            amount: 5, 
            location: '圖書館', 
            description: 'yeah',
            expirationTime: '2023/10/09 09:15', 
            category: '便當',
            imageList: ['/images/log-decorative.png'],
        },
      ];
      setUploadedItems(initialItems2);
  }, []);

//------------------- Food Item----------------------

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

              <div className="div-29">
                <ItemList listHeight={"700px"} items={isSavedItem === true ? filteredItems: uploadedItems} Popup={ItemDetail} />
              </div>

            </div>
          </div>
        </div>
      </div>

      </>
  );
}







export default Profile