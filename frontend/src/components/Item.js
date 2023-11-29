import React from 'react';
import './Item.css'; // Make sure to create appropriate styles
import ItemFollow from './ItemFollow';

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
}) {
    return (
        <div className="item-container" onClick={() => onOpenPopup(editable)}>
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
