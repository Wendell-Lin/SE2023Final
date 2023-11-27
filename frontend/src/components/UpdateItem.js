import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateItem.css';

function UpdateItem(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // parse JSON string
  const encodedItemData = searchParams.get('itemData');

  // decode the JSON string
  const itemData = encodedItemData ? JSON.parse(decodeURIComponent(encodedItemData)) : null;
  console.log(itemData)
  
  const [formData, setFormData] = useState(itemData);
  const [succeedMsg, setSucceedMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#91968a"; // Set your desired color

    return () => {
      document.body.style.backgroundColor = null; // Reset to default or another color
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Handle multiple file uploads
    const newFiles = files.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));

    setFormData(prevFormData => ({
      ...prevFormData,
      images: [...prevFormData.images, ...newFiles],
    }));
  };

  const removeImage = (index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, i) => i !== index),
    }));
  };  

  const renderImageScroll = () => (
    <div className="itemImageList">
      {formData.images?.map((file, index) => (
        <div key={index} className="itemImage">
          <img src={file.preview} alt={`preview-${index}`} />
          <button 
            className="remove-image-btn"
            onClick={() => removeImage(index)}>x</button>
        </div>
      ))}

      <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
        <img src={'/images/image_placeholder.png'} alt="Upload" style={{ width: '100px', height: '100px' }} />
      </label>
    </div>
  );
  const handleUpload = (event) => {
    event.preventDefault();
    console.log(formData);
    setSucceedMsg("Sucessfully update item");
  }

  return (
    <>
    {succeedMsg && (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>{succeedMsg}</h2>
          <button 
            className='close-button'
            onClick={() => setTimeout(() => {navigate('/profile')}, 100)}>Close</button>
        </div>
      </div>
    )}
      <div className='parent-container'>
        <div className='upload-container'>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px' }}>
            <input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            {renderImageScroll()}
            {/* <button type="button" onClick={() => document.getElementById('image-upload').click()}>Select Images</button> */}
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Snack">Snack</option>
              <option value="便當">便當</option>
              {/* Add your categories here */}
            </select>
            <label>Amount</label>
            <input 
              type="number" 
              name="amount" 
              min={1}
              value={formData.amount} 
              onChange={handleInputChange}
              required
            />
            <label>Expiration Time</label>
            <input type="datetime-local" name="expirationTime" value={formData.expirationTime} onChange={handleInputChange} required/>
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} required/>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
            <button className='upload-button' type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
}


export default UpdateItem

