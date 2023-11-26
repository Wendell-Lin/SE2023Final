// ItemList.js
import React, { useState } from 'react';
import Item from './Item';
import './ItemList.css';

function ItemList({ listHeight, items, Popup }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenPopup = (item) => {
        setSelectedItem(item);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const listStyle = {
        maxHeight: listHeight,
    };

    return (
        <div className="list-container" style={listStyle}>
            {items.map((item, index) => (
                <Item 
                    key={index} 
                    {...item} 
                    onOpenPopup={() => handleOpenPopup(item)}
                />
            ))}
            {selectedItem && (
                 <Popup item={selectedItem} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default ItemList;
