// ItemList.js
import React from 'react';
import Item from './Item';
import './ItemList.css'; // Assuming you will store your CSS for the list here

function ItemList({ items }) {
    return (
        <div className="list-container">
            {items.map((item, index) => (
                <Item key={index} {...item} />
            ))}
        </div>
    );
}

export default ItemList;
