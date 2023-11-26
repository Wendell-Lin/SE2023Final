import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';
import ItemDetail from '../components/ItemDetail';
import Map from '../components/Map';
import './ViewItems.css'

const ViewItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = "#666D5D"; // Set your desired color
    
        return () => {
          document.body.style.backgroundColor = null; // Reset to default or another color
        };
      }, []);

    useEffect(() => {
        // Fetch or initialize items here
        // This should be an array of objects, not just strings
        const initialItems = [
            { 
                name: 'A bag of cookies', 
                amount: 5, 
                location: 'Library', 
                description: 'I just got it as a gift, but I am losingI just got it as a gift, but I am losing weight.... \nAnyone who is interested in it...\n JUST TAKE IT!!!',
                expirationTime: '2023/10/09 09:15',
                category: 'Snack',
                imageList: ['/images/log-decorative.png'],
            },
            { 
                name: '師大第一腿', 
                amount: 5, 
                location: '德田館', 
                description: '好吃',
                expirationTime: '2023/10/09 09:15', 
                category: '便當'
            },
            { 
                name: '烤肉飯', 
                amount: 5, 
                location: '圖書館', 
                description: 'yeah',
                expirationTime: '2023/10/09 09:15', 
                category: '便當',
                imageList: ['/images/log-decorative.png'],
            },
            {},{},{}
            // ... more items
        ];
        setItems(initialItems);
        setFilteredItems(initialItems);
    }, []);

    const onSearchTermChange = (term) => {
        const updatedFilteredItems = items.filter(item => {
            // Convert item object values to array, filter only string values
            return Object.values(item).filter(value => typeof value === 'string')
                // Check if any string contains the search term
                .some(value => value.toLowerCase().includes(term.toLowerCase()));
        });
        setFilteredItems(updatedFilteredItems);
    };
    
    const latitude = 37.42216;
    const longitude = -122.08427;

    return (
        <div className="view-container">
            <div className="left-section">
                <SearchBar className="test" onSearchTermChange={onSearchTermChange} />
                <ItemList listHeight={"600px"} items={filteredItems} Popup={ItemDetail} />
            </div>
            <div className="right-section">
                <Map latitude={latitude} longitude={longitude} />
            </div>
        </div>
    );
}

export default ViewItems;
