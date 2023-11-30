import React, {useState, useEffect} from "react";
import './Profile.css';
import PersonalInfo from '../components/ProfilePersonalInfo';
import ProfileItemList from '../components/ProfileItemList';
import FakeData from './FakeData.json'

function Profile(props) {
  console.log(FakeData)
  //------------------- User Info----------------------  
  const [userInfo, setUserInfo] = useState(FakeData.user)
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