import React, { useState } from 'react';
import './UploadItems.css'

const UploadItems = () => {
  const [formData, setFormData] = useState({
    token: '',
    name: '',
    amount: 1,
    location: '',
    category: '',
    latitude: 0.0,
    longitude: 0.0,
    description: '',
    expirationTime: '',
    images: [], // Start with an empty array
  });

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
      {formData.images.map((file, index) => (
        <div key={index} className="itemImage">
          <img src={file.preview} alt={`preview-${index}`} />
          <button onClick={() => removeImage(index)}>x</button>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderRadius: '10px'}}>
        <div>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '10px' }}>
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <button type="button" onClick={() => document.getElementById('image-upload').click()}>Select Images</button>
          {renderImageScroll()}
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select</option>
            {/* Add your categories here */}
          </select>
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
          <label>Expiration Time</label>
          <input type="time" name="expirationTime" value={formData.expirationTime} onChange={handleInputChange} />
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </form>
      </div>
    </div>
    <button type="submit">Upload</button>
    </>
  );
}

export default UploadItems;
