// ItemList.js
import React, { useState, useEffect } from 'react';
import Item from './Item';
import './ItemList.css';

function ItemList({ listHeight, items, Popup }) {
    const [savedItemIds, setSavedItemIds] = useState(new Set([
        // '1', '3'
    ]));
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        setItemList(items.map(item => ({
            ...item,
            expirationTime: item.expirationTime ? formatToUTC8(item.expirationTime) : '',
            saved: savedItemIds.has(item.itemId)
        })));
    }, [items, savedItemIds]);

    const handleOpenPopup = (item) => {
        setSelectedItem(item);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const listStyle = {
        maxHeight: listHeight,
    };

    const formatToUTC8 = (isoDateString) => {
        const date = new Date(isoDateString);
    
        // Convert to UTC+8
        const utc8Date = new Date(date.getTime());
    
        // Format the date
        const year = utc8Date.getFullYear();
        const month = (utc8Date.getMonth() + 1).toString().padStart(2, '0');
        const day = utc8Date.getDate().toString().padStart(2, '0');
        const hours = utc8Date.getHours().toString().padStart(2, '0');
        const minutes = utc8Date.getMinutes().toString().padStart(2, '0');
    
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };    

    const toggleSaved = (itemId) => {
        // todo: POST /user/follow
        setSavedItemIds(prevSavedItemIds => {
            const newSavedItemIds = new Set(prevSavedItemIds);
            if (newSavedItemIds.has(itemId)) {
                newSavedItemIds.delete(itemId);
            } else {
                newSavedItemIds.add(itemId);
            }
            return newSavedItemIds;
        });
        // Update itemList and selectedItem
        setItemList(currentItems => currentItems.map(item => {
            if (item.itemId === itemId) {
                const updatedItem = { ...item, saved: !item.saved };
                // Also update selectedItem if it's the same item
                if (selectedItem && selectedItem.itemId === itemId) {
                    setSelectedItem(updatedItem);
                }
                return updatedItem;
            }
            return item;
        }));
    };

    return (
        <div className="list-container" style={listStyle}>
            {itemList.map((item, index) => (
                <Item 
                    key={index} 
                    {...item}
                    onToggleSaved={() => toggleSaved(item.itemId)}
                    onOpenPopup={() => handleOpenPopup(item)}
                />
            ))}
            {selectedItem && (
                 <Popup 
                    item={selectedItem}
                    onClose={handleClosePopup} 
                    onToggleSaved={() => toggleSaved(selectedItem.itemId)}
                />
            )}
        </div>
    );
}

export default ItemList;
