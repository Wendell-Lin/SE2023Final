import React, { useState } from "react";
import "./ProfileItemList.css";
import ItemList from "../components/ItemList";
import ItemDetail from "../components/ItemDetail";
import { useNavigate } from "react-router-dom";

function ProfileItemList({ setSelectItem, filteredItems, uploadedItems }) {
  const [isSavedItem, setIsSavedItem] = useState(false);
  function showSavedItem() {
    setIsSavedItem(false);
  }
  function showUploadedItem() {
    setIsSavedItem(true);
  }

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/uploaditems");
    console.log("add item");
  };

  //------------------- Food Item----------------------

  return (
    <>
      <div className="itemlist">
        <div className="topbar">
          <button
            onClick={showSavedItem}
            className={
              !isSavedItem === true ? "item-list-shown" : "item-list-unshown"
            }
            name="saved item"
            type="submit"
          >
            {" "}
            Saved Items
          </button>
          <button
            onClick={showUploadedItem}
            className={
              !isSavedItem === false ? "item-list-shown" : "item-list-unshown"
            }
            name="upload item"
            type="submit"
          >
            {" "}
            Uploaded Items
          </button>
          <div className="add">
            <img
              name="add image"
              loading="lazy"
              src="images/add_icon.png"
              className="img-2"
              onClick={handleNavigate}
            />
          </div>
        </div>

        <div className="item-list">
          <ItemList
            setSelectItem={setSelectItem}
            isUploaded={isSavedItem}
            listHeight={"600px"}
            items={isSavedItem === true ? filteredItems : uploadedItems}
            Popup={ItemDetail}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileItemList;
