// ItemDetail.js
import React from 'react';
import ItemFollow from './ItemFollow';
import './ItemDetail.css'; // Make sure to create and import appropriate styles

function ItemDetail({ item, onClose, onToggleSaved }) {

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="item-detail-backdrop" onClick={onClose}>
            <div className="item-detail-popup" onClick={stopPropagation}>
                <div className='item-upper'>
                    <div className='item-upper-left'>
                        <span className="expiration-time">Expiration Time: {item.expirationTime}</span>
                    </div>
                    <div className='item-upper-right'>
                        <span className="item-type">{item.category}</span>
                        <ItemFollow 
                            itemId={item.itemId}
                            saved={item.saved}
                            onToggleSaved={onToggleSaved}
                        />
                    </div>
                </div>
                {item.imageList &&  <div className="item-image-list">
                    {item.imageList.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`${index}`} />
                    ))}
                </div>}

                <div className="item-detail-header">
                    <h2>{item.name}</h2>
                </div>
                <div className="item-lower-right">
                    {/* <img src={item.imageList[0]} alt={item.name} /> */}
                    <p>amount: {item.amount}</p>
                    <p>ppl watching: {item.numberOfFollower} </p>
                    <p>location: {item.location}</p>
                    <p>Description: {item.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
