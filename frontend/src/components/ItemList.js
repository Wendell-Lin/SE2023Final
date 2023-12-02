// ItemList.js
import React, { useState, useEffect } from 'react';
import Item from './Item';
import './ItemList.css';
import userService from '../services/userService';
import { useCookies } from 'react-cookie'

function ItemList({ setSelectItem, isUploaded, listHeight, items, Popup }) {
    const [savedItemIds, setSavedItemIds] = useState(new Set([
        // '1', '3'
    ]));
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        const fetchFollowedItems = async () => {
            try {
                const response = await userService.getFollow(cookies);
                const followedItems = response.items || [];
                const followedIds = new Set(followedItems.map(item => item.id));
                setSavedItemIds(followedIds);
            } catch (error) {
                console.error("Error fetching followed items:", error);
                // Handle error appropriately
            }
            console.log(savedItemIds);
        };
        fetchFollowedItems();
    }, [cookies]);

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

    const toggleSaved = async (itemId) => {
        // Keep a reference to the original state
        const originallySaved = savedItemIds.has(itemId);
    
        // Optimistically update the UI
        setSavedItemIds(prevSavedItemIds => {
            const newSavedItemIds = new Set(prevSavedItemIds);
            if (originallySaved) {
                newSavedItemIds.delete(itemId);
            } else {
                newSavedItemIds.add(itemId);
            }
            return newSavedItemIds;
        });
    
        setItemList(currentItems => currentItems.map(item => {
            if (item.itemId === itemId) {
                const updatedItem = { ...item, saved: !originallySaved };
                // Also update selectedItem if it's the same item
                if (selectedItem && selectedItem.itemId === itemId) {
                    setSelectedItem(updatedItem);
                }
                return updatedItem;
            }
            return item;
        }));
    
        // Attempt to update the server
        try {
            await userService.followItem(itemId, !originallySaved, cookies);
        } catch (e) {
            console.error("Error toggling save status:", e);
    
            // Revert the UI changes if the server update fails
            setSavedItemIds(prevSavedItemIds => {
                const revertedSavedItemIds = new Set(prevSavedItemIds);
                if (originallySaved) {
                    revertedSavedItemIds.add(itemId);
                } else {
                    revertedSavedItemIds.delete(itemId);
                }
                return revertedSavedItemIds;
            });
    
            setItemList(currentItems => currentItems.map(item => {
                if (item.itemId === itemId) {
                    return { ...item, saved: originallySaved };
                }
                return item;
            }));
        }
    };
    console.log(itemList)
    

    return (
        <div className="list-container" style={listStyle}>
            {itemList.map((item, index) => (
                <Item 
                    setSelectItem={setSelectItem}
                    isUploaded={isUploaded}
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
