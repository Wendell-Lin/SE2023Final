import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'; // For solid heart icon
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'; // For regular heart icon
import './Item.css'; // Make sure to create appropriate styles

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
    editable,
    onOpenPopup,
}) {
    const [heartToggled, setHeartToggled] = useState(false);

    // Function to toggle the heart icon
    const toggleHeart = (e) => {
        e.stopPropagation(); // Prevent the click from triggering the item's popup
        setHeartToggled(!heartToggled);
    };

    return (
        <div className="item-container" onClick={() => onOpenPopup(editable)}>
            <div className='item-upper'>
                <div className='item-upper-left'>
                    <span className="expiration-time">Expiration Time: {expirationTime}</span>
                </div>
                <div className='item-upper-right'>
                    <span className="item-type">{category}</span>
                    <button 
                        className="like-icon" 
                        onClick={toggleHeart}
                        aria-label="Toggle favorite"
                    >
                        <FontAwesomeIcon icon={heartToggled ? fasHeart : farHeart} />
                    </button>
                </div>
            </div>
            <div className='item-lower'>
                <div className='item-lower-left'>
                    {imageList && imageList.length > 0 && (
                        <img src={imageList[0]} alt={name} />
                    )}
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
