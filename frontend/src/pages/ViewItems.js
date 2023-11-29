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
        document.body.style.backgroundColor = "#91968a"; // Set your desired color

        return () => {
            document.body.style.backgroundColor = null; // Reset to default or another color
        };
        }, []);

    useEffect(() => {
        // Fetch or initialize items here
        // This should be an array of objects, not just strings
        const initialItems = [
            { 
                itemId: '1',
                name: 'A bag of cookies', 
                amount: 5, 
                location: 'Library', 
                description: 'I just got it as a gift, but I am losingI just got it as a gift, but I am losing weight.... \nAnyone who is interested in it...\n JUST TAKE IT!!!',
                expirationTime: '2023-11-28T16:36:00.000Z',
                category: 'Snack',
                imageList: [
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                    '/images/log-decorative.png',
                ],
                latitude: '25.017498286570472',
                longitude: '121.54061584453842'
            },
            { 
                itemId: '2',
                name: '師大第一腿', 
                amount: 5, 
                location: '德田館', 
                description: '好吃',
                expirationTime: '2023-11-29T10:17:00.000+03:00', 
                category: '便當'
            },
            { 
                itemId: '3',
                name: '烤肉飯', 
                amount: 5, 
                location: '圖書館', 
                description: 'yeah',
                expirationTime: '2023-11-29T10:17', 
                category: '便當',
                imageList: ['/images/log-decorative.png'],
            },
            {itemId: '4'},{itemId: '5'},{itemId: '6'}
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

    return (
        <div className="view-container">
            <div className="left-section">
                <SearchBar className="test" onSearchTermChange={onSearchTermChange} />
                <ItemList listHeight={"720px"} items={filteredItems} Popup={ItemDetail} />
            </div>
            <div className="right-section">
                <Map items={filteredItems}/>
            </div>
        </div>
    );
}

export default ViewItems;
