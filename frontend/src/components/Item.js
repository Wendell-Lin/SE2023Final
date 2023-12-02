import React from 'react';
import './Item.css'; // Make sure to create appropriate styles
import ItemFollow from './ItemFollow';
import { useNavigate, Link } from 'react-router-dom';
import  AppRoutes from "../Routes"


function Item({
    setSelectItem,
    itemId,
    name, 
    location, 
    category,
    latitude,
    longitude, 
    amount, 
    description, 
    expirationTime,
    numberOfFollow,
    imageList,
    saved,
    onToggleSaved,
    onOpenPopup,
    editable,
    isUploaded // new!!
}) {

    const itemData = {
        itemId:itemId,
        name:name, 
        location:location, 
        categoryName:category,
        latitude:latitude,
        longitude:longitude, 
        quantity:amount, 
        description:description, 
        endtime:expirationTime,
        numberOfFollow:numberOfFollow,
        imageList:imageList,
        saved:saved
    }
    console.log(setSelectItem)

    const navigate = useNavigate();

    // // navigate with only id
    // const setEditItem = () => {
    //     console.log("Edit");
    //     // navigate to update item page with param
    //     navigate('/updateItem?itemid=' + itemId);
    // }
   
    
    // navigate with all item data
    // const encodedItemData = encodeURIComponent(JSON.stringify(itemData));    
    // const setEditItem = () => {
    //     console.log("Edit");
    //     // navigate to update item page with param
    //     navigate('/updateItem?itemData=' + encodedItemData);
    // }
    // const navigate = useNavigate();
    
    // const handleUpdateClick = () => {
    //     // 将item信息传递给updateItem页面
    //     navigate({
    //       pathname: '/updateItem',
    //       state: { itemData }
    //     });
    //   };
     
    const setEditItem = () => {
        console.log("Edit");
        // navigate to update item page with param
        setSelectItem(itemData);
        navigate('/updateItem');
    }
    
    
    return (
        // <div className="container">
            
        // </div>
        <div className="item-container" onClick={() => onOpenPopup(editable)}>
            {/* new!! */}
            
            <div onClick={() => isUploaded && setEditItem()}>
            {isUploaded ? (
                <img
                loading="lazy"
                src="images/edit.png"
                className="edit"
                />
            ) : null}
            </div>
            {/* new!! */}
            <div className='item-upper'>                
                <div className='item-upper-left'>
                    <span className="expiration-time">Expiration Time: {expirationTime}</span>
                    <span className="item-type">{category}</span>
                </div>
                    <ItemFollow 
                        itemId={itemId}
                        saved={saved}
                        onToggleSaved={onToggleSaved}
                    />
                <div className='item-upper-right'>
                </div>
                
            </div>

            
            <div className='item-lower'>
                <div className='item-lower-left'>
                    {(imageList && imageList.length > 0) ? (
                        <img src={imageList[0]} alt={name} />
                    ):
                        <img src={'images/image_placeholder.png'} alt={"image_placeholder"} />
                    }
                </div>
                <div className='item-lower-right'>
                    <h3 className="item-title">{name}</h3>
                    <div className="item-details">
                        <p>Amount: {amount}</p>
                        <p>Location: {location}</p>
                        <p>ppl watching: {numberOfFollow}</p>
                    </div>
                    <div className='item-description'>{description}</div>
                </div>
            </div>            
        </div>
    );
}

export default Item;
