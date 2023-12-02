import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';
import ItemDetail from '../components/ItemDetail';
import Map from '../components/Map';
import './ViewItems.css'
import itemService from '../services/itemService'
import Item from '../components/Item';

const ViewItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [savedItemIds, setSavedItemIds] = useState(new Set());

    useEffect(() => {
        document.body.style.backgroundColor = "#91968a"; // Set your desired color

        return () => {
            document.body.style.backgroundColor = null; // Reset to default or another color
        };
        }, []);

    useEffect(() => {
        // Fetch or initial items if not fetched here
        const initialItems = [
            {itemId: 4},{itemId: 5},{itemId: 6}
        ];
        const handleGetItemList = async () => {
            try {
                // async and await is needed here.
                const itemList = await itemService.getItemList();
                const fetchedItems = itemList.map(
                    item => ({
                        ...item,
                        itemId: item.id,
                        amount: item.quantity,
                        category: item.categoryName,
                        numberOfFollow: item.numberOfFollowers,
                        expirationTime: item.endTime,
                    })
                );
                // console.log(fetchedItems);
                setItems(fetchedItems);
                setFilteredItems(fetchedItems);
            } catch (e) {
                console.error("Error:", e);
                setItems(initialItems);
                setFilteredItems(initialItems);
            }
        }
        handleGetItemList();
    }, []);

    useEffect(()=>{
        // console.log(savedItemIds);
    }, [savedItemIds])

    const onSearchTermChange = (term) => {
        const updatedFilteredItems = items.filter(item => {
            // Convert item object values to array, filter only string values
            return Object.values(item).filter(value => typeof value === 'string')
                // Check if any string contains the search term
                .some(value => value.toLowerCase().includes(term.toLowerCase()));
        });
        setFilteredItems(updatedFilteredItems);
    };

    return (
        <div className="view-container">
            <div className="left-section">
                <SearchBar className="test" onSearchTermChange={onSearchTermChange} />
                <ItemList 
                    listHeight={"720px"}
                    items={filteredItems}
                    Popup={ItemDetail}
                    outSaveItemIds={savedItemIds}
                />
            </div>
            <div className="right-section">
                <Map 
                    items={filteredItems} 
                    Popup={ItemDetail}
                    setSavedItemIds={setSavedItemIds}
                    savedItemIds={savedItemIds}
                />
            </div>
        </div>
    );
}

export default ViewItems;
