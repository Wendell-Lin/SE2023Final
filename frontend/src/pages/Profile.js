import React, {useState, useEffect} from "react";
import './Profile.css';
import PersonalInfo from '../components/ProfilePersonalInfo';
import ProfileItemList from '../components/ProfileItemList';

function Profile(props) {
   //------------------- User Info----------------------  
  const [userInfo, setUserInfo] = useState({
    name: "Pompom", 
    email: "r1121111@ntu.edu.tw",
    notification: false,
    userImg: "images/Image_placeholder.png",
  })
    // useEffect(() => {
    //   const initialUser = {
    //     name: "Tom Tsaiiii", 
    //     email: "r1121111@ntu.edu.tw",
    //     notification: false,
    //     userImg: "images/Image_placeholder.png",
    //   };
    //   setUserInfo(initialUser);
    // }, []); // <-- 添加空list，確保只會render once

    //------------------- Food Item----------------------
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
      <div className="profile_container">
        <div className="profile_allInfo">
          <div className="userInfo_column">
            <PersonalInfo userInfo={userInfo}/>
          </div>

          <div className="ItemList_column">
            <ProfileItemList filteredItems={filteredItems} uploadedItems={uploadedItems}/>
          </div>
        </div>
      </div>

      </>
  );
}


export default Profile