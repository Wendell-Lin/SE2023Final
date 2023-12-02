import React, { useState, useEffect } from "react";
import "./Profile.css";
import PersonalInfo from "../components/ProfilePersonalInfo";
import ProfileItemList from "../components/ProfileItemList";
import FakeData from "./FakeData.json";
import { useCookies } from "react-cookie";
import profileService from "../services/profileService";
import userService from "../services/userService";



function Profile({setSelectItem}) {

  //------------------- User Info----------------------
  // GET from Fake Data
  // const [userInfo, setUserInfo] = useState(FakeData.user)
  //------------------- Food Item----------------------
  const [followedItems, setFollowItems] = useState(FakeData.savedItems);
  const [uploadedItems, setUploadedItems] = useState(FakeData.uploadedItems);
  const [cookies] = useCookies();
  console.log(cookies);

  useEffect(() => {
    // Fetch or initial items if not fetched here
    const initialItems = [
        {itemId: 4},{itemId: 5}
    ];
    const getUploadedItemList = async () => {
        try {
            // async and await is needed here.
            const itemUploadedList = await profileService.getUploadedItem(cookies);
            console.log("upload")
            console.log(itemUploadedList)
            const fetchedItems = itemUploadedList.items.map( // 符合原先的命名
                item => ({
                    ...item,
                    itemId: item.id,
                    amount: item.quantity,
                    category: item.categoryName,
                    numberOfFollow: item.numberOfFollowers,
                    expirationTime: item.endTime,
                })
            );
            console.log(fetchedItems);
            setFollowItems(fetchedItems);
        } catch (e) {
            console.log('Fail')
            console.error("Error:", e);
            setFollowItems(initialItems);
        }
    }
    getUploadedItemList();
}, [cookies]);

useEffect(() => {
  const initialItems = [
    {itemId: 4},{itemId: 5}
];
  const getFollowedItems = async () => {
      try {
          const itemFollowList = await profileService.getFollowItem(cookies);
          console.log("saved")
          console.log(itemFollowList)
            const fetchedItems = itemFollowList.items.map( // 符合原先的命名
                item => ({
                    ...item,
                    itemId: item.id,
                    amount: item.quantity,
                    category: item.categoryName,
                    numberOfFollow: item.numberOfFollowers,
                    expirationTime: item.endTime,
                })
            );
            console.log(fetchedItems);
            setUploadedItems(fetchedItems);
      } catch (error) {
          console.error("Error fetching followed items:", error);
          // Handle error appropriately
      }
      console.log(uploadedItems);
  };
  getFollowedItems();
}, [cookies]);



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
              filteredItems={followedItems}
              uploadedItems={uploadedItems}
              setSelectItem={setSelectItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
