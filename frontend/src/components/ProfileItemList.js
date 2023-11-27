import React, {useState} from "react";
import './ProfileItemList.css';
import ItemList from '../components/ItemList';
import ItemDetail from '../components/ItemDetail'
function ProfileItemList({filteredItems, uploadedItems}) {
  const [isSavedItem, setIsSavedItem] = useState(false)
  function showSavedItem(){
      setIsSavedItem(isSavedItem => !isSavedItem)
  } 


//------------------- Food Item----------------------

  return (
    <>
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


      </>
  );
}







export default ProfileItemList