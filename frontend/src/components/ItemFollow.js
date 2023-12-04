import React, { useState } from 'react';
import './ItemFollow.css'

function ItemFollow({ itemId, saved, onToggleSaved }) {
    const [reload, setReload] = useState(false);

    // 點擊按鈕時觸發重新渲染
    // const handleReload = () => {
      
    // };

    const handleToggle = (e) => {
        e.stopPropagation(); // Prevent triggering parent click events
        onToggleSaved(itemId);
        setReload(!reload);
        
    };
    

    return (
        <button className="like-icon" onClick={handleToggle} aria-label="Toggle favorite">
            {/* <FontAwesomeIcon icon={saved ? fasHeart : farHeart} /> */}
            <img src={`/images/Heart${saved ? 'Dark': 'Light'}.png`} alt='save_icon'></img>
        </button>
    );
}

export default ItemFollow;
