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
                        <span className="item-type">{item.category}</span>
                    </div>
                    <div className='item-upper-right'>
                        <ItemFollow 
                            itemId={item.itemId}
                            saved={item.saved}
                            onToggleSaved={onToggleSaved}
                        />
                    </div>
                </div>
                {(item.imageList && item.imageList.length > 0) ? (<div className="item-image-list">
                    {item.imageList.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`${index}`} />
                    ))}
                </div>) : (
                    <img src={'images/image_placeholder.png'} alt={"image_placeholder"} />
                )}

                <div className="item-lower-right">
                    {/* <img src={item.imageList[0]} alt={item.name} /> */}
                    <h3 className="item-title">{item.name}</h3>
                    <div className="item-details">
                        <p>Amount: {item.amount}</p>
                        <p>Location: {item.location}</p>
                        <p>ppl watching: {item.numberOfFollow}</p>
                    </div>
                    <div className='item-description'>{item.description}</div>
                </div>
                <div className="item-lower-right">
                    {/* <img src={item.imageList[0]} alt={item.name} /> */}
                    <div className="item-details">
                        <p>Provider: {item.creatorName}({item.creatorEmail})</p>
                    </div>
                    <div className='item-description'>{item.description}</div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
