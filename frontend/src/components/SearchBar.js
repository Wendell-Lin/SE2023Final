// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'

function SearchBar({ onSearchTermChange }) {
    const [term, setTerm] = useState('');

    const onInputChange = (event) => {
        setTerm(event.target.value);
        onSearchTermChange(event.target.value);
    };

    return (
        <div className='search-bar'>
            <img src='/images/Search.png' alt='search'/>
            <input
                type="text"
                value={term}
                onChange={onInputChange}
                placeholder="Search"
            />
        </div>
    );
}

export default SearchBar;
