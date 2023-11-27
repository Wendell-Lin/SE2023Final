import React from 'react';
import './Item.css'; // Make sure to create appropriate styles
import ItemFollow from './ItemFollow';
import { useNavigate } from 'react-router-dom';

function Item({
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
        category:category,
        latitude:latitude,
        longitude:longitude, 
        amount:amount, 
        description:description, 
        expirationTime:expirationTime,
        numberOfFollow:numberOfFollow,
        imageList:imageList,
    }
    const encodedItemData = encodeURIComponent(JSON.stringify(itemData));

    const navigate = useNavigate();
    const setEditItem = () => {
        console.log("Edit");
        // navigate to update item page with param
        navigate('/updateItem?itemData=' + encodedItemData);
    }

    return (
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
                </div>
                
                <div className='item-upper-right'>
                    <span className="item-type">{category}</span>
                    <ItemFollow 
                        itemId={itemId}
                        saved={saved}
                        onToggleSaved={onToggleSaved}
                    />
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
