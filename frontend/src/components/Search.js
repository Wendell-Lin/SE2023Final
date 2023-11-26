// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearchTermChange }) {
    const [term, setTerm] = useState('');

    const onInputChange = (event) => {
        setTerm(event.target.value);
        onSearchTermChange(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={term}
                onChange={onInputChange}
                placeholder="Search items..."
            />
        </div>
    );
}

export default SearchBar;
