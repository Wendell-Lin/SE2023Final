// ItemDetail.js
import React from 'react';
import './ItemDetail.css'; // Make sure to create and import appropriate styles

function ItemDetail({ item, onClose }) {

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="item-detail-backdrop" onClick={onClose}>
            <div className="item-detail-popup" onClick={stopPropagation}>
                <div className="item-detail-header">
                    <h2>{item.name}</h2>
                </div>
                <div className="item-detail-body">
                    {/* <img src={item.imageList[0]} alt={item.name} /> */}
                    <p><strong>Amount:</strong> {item.amount}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Expiration Time:</strong> {item.expirationTime}</p>
                    <p><strong>Number of Followers:</strong> {item.numberOfFollow}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
