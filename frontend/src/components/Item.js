// Item.js
import React from 'react';
import './Item.css'; // Make sure to create appropriate styles

function Item({ 
  name, 
  amount, 
  location, 
  category, 
  description, 
  expirationTime, 
  imageList 
}) {
    return (
        <div className="item-container">
            <div className="item-header">
                <span className="expiration-time">Expiration Time: {expirationTime}</span>
                <span className="like-icon">❤️</span>
            </div>
            {imageList && imageList.length > 0 && (
                <div className="item-images">
                    {/* Display the first image as a placeholder, for example */}
                    <img src={imageList[0]} alt={name} />
                </div>
            )}
            <div className="item-title">{name}</div>
            <div className="item-details">
                <p>Amount: {amount}</p>
                <p>Location: {location}</p>
                <p>Description: {description}</p>
            </div>
            <div className="item-footer">
                <span className="item-type">{category}</span>
            </div>
        </div>
    );
}

export default Item;
