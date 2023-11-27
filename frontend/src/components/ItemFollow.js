import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

function ItemFollow({ itemId, saved, onToggleSaved }) {
    const handleToggle = (e) => {
        e.stopPropagation(); // Prevent triggering parent click events
        onToggleSaved(itemId);
    };

    return (
        <button className="like-icon" onClick={handleToggle} aria-label="Toggle favorite">
            {/* <FontAwesomeIcon icon={saved ? fasHeart : farHeart} /> */}
        </button>
    );
}

export default ItemFollow;
