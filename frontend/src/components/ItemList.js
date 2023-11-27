// ItemList.js
import React, { useState, useEffect } from 'react';
import Item from './Item';
import './ItemList.css';

function ItemList({ listHeight, items, Popup }) {
    const [savedItemIds, setSavedItemIds] = useState(new Set([
        '1', '3'
    ]));
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        setItemList(items.map(item => ({
            ...item,
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

    const toggleSaved = (itemId) => {
        // todo: User follow item api
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

    console.log(itemList)

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
