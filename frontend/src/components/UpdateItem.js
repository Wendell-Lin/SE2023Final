import React, { useState, useEffect } from "react";
import itemJson from "../components/Item.json";
import itemService from "../services/itemService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./UpdateItem.css";

function UpdateItem({ item }) {
  console.log("EDITE Item");
  // console.log(item);
  // const location = useLocation();
  const [formData, setFormData] = useState(item);
  const [itemData, setItemData] = useState(item);
  const [succeedMsg, setSucceedMsg] = useState("");
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [isDeleteFetched, setIsDeleteFetched] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  // // Use URL parsing
  // const searchParams = new URLSearchParams(location.search);
  // // parse JSON string
  // const encodedItemData = searchParams.get('itemData');
  // // decode the JSON string
  // const itemData = encodedItemData ? JSON.parse(decodeURIComponent(encodedItemData)) : null;
  // // console.log(itemData)

  useEffect(() => {
    document.body.style.backgroundColor = "#91968a"; // Set your desired color

    return () => {
      document.body.style.backgroundColor = null; // Reset to default or another color
    };
  }, []);
  useEffect(() => {
    if (isLocationFetched) {
      // console.log(itemData)
      handleUploadRequest();
      setIsLocationFetched(false);
    }
  }, [isLocationFetched, formData]); // Depend on both isLocationFetched and formData

  // Delete!!!
  function setDeleteItem() {
    handleDeleteRequest();
    setIsDeleteFetched(false);
  }

  const handleDeleteRequest = async () => {
    try {
      const data = await itemService.deleteItem(formData.itemId, cookies);
      console.log(data)
      setSucceedMsg("Successfully delete item");
    } catch (error) {
      console.log(error)
      console.log(error.response)
      setSucceedMsg("Failed to delete item");
    }
  };

  const handleUploadRequest = async () => {
    const updateData = {
      itemId: formData.itemId,
      name: formData.name,
      categoryName: formData.categoryName,
      latitude: formData.latitude,
      longitude: formData.longitude,
      quantity: formData.amount,
      location: formData.location,
      description: formData.description,
      startTime: formData.startTime,
      endTime: formData.endTime,
      imageList: formData.imageList,
    };

    try {
      const data = await itemService.updateItem(updateData, cookies);
      setSucceedMsg("Successfully update item");
    } catch (error) {
      let title = "Error";
      let content = "An unexpected error occurred.";

      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          title = "Upload Failed";
          content = data.message || "User cannot be found by this email.";
        }
      } else if (error.request) {
        content = "No response from the server.";
      } else {
        content = error.message;
      }

      setSucceedMsg("Failed to upload item");
    }
  };

  const convertToUTC0 = (endTime) => {
    if (!endTime) return endTime; // Return as is if endTime is not set

    // Create a Date object and convert to UTC+0
    const date = new Date(endTime);
    return date.toISOString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Handle multiple file uploads

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result); // 直接轉base64
            // resolve({
            //   preview: URL.createObjectURL(file),
            //   base64: event.target.result,
            // });
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      })
    )
      .then((images) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageList: [...prevFormData.imageList, ...images],
        }));
      })
      .catch((error) => {
        console.error("Error converting images to base64: ", error);
      });
  };

  const removeImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageList: prevFormData.imageList.filter((_, i) => i !== index),
    }));
  };

  const renderImageScroll = () => (
    <div className="itemImageList">
      {formData.imageList.map((file, index) => (
        <div key={index} className="itemImage">
          <img src={file} alt={`preview-${index}`} />
          <button
            type="button"
            className="remove-image-btn"
            onClick={() => removeImage(index)}
          >
            x
          </button>
        </div>
      ))}

      <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
        <img
          src={"/images/image_placeholder.png"}
          alt="Upload"
          style={{ width: "100px", height: "100px" }}
        />
      </label>
    </div>
  );

  console.log(formData.imageList)
  const handleUpload = (event) => {
    event.preventDefault();
    const action = event.target.getAttribute("name");
    console.log("ACTION");
    console.log(action);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update formData with user location and then submit
          const currentTimeUTC = new Date().toISOString();
          const base64Images = formData.imageList.map((image) => image.base64);
          const newItemData = {
            ...formData,
            quantity: parseInt(formData.quantity),
            startTime: currentTimeUTC,
            endTime: convertToUTC0(formData.endTime),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            imageList: base64Images,
          };
          setItemData(newItemData); // set to itemData to upload instad of immute formData
          setIsLocationFetched(true);
        },
        (error) => {
          const currentTimeUTC = new Date().toISOString();
          const base64Images = formData.imageList.map((image) => image.base64);
          const newItemData = {
            ...formData,
            quantity: parseInt(formData.quantity),
            startTime: currentTimeUTC,
            endTime: convertToUTC0(formData.endTime),
            imageList: base64Images,
          };
          console.error("Error Code = " + error.code + " - " + error.message);
          setItemData(newItemData); // set to itemData to upload instad of immute formData
          setIsLocationFetched(true);
        }
      );
    } else {
      const currentTimeUTC = new Date().toISOString();
      const base64Images = formData.imageList.map((image) => image.base64);
      const newItemData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        startTime: currentTimeUTC,
        endTime: convertToUTC0(formData.endTime),
        imageList: base64Images,
      };
      console.error("Geolocation is not supported by this browser.");
      setItemData(newItemData); // set to itemData to upload instad of immute formData
      setIsLocationFetched(true);
    }
  };
  var exptime = formData.endTime;
  // console.log(exptime.substr(0, 16));
  return (
    <>
      {succeedMsg && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{succeedMsg}</h2>
            <button
              className="close-button"
              onClick={() => {
                if (!succeedMsg.startsWith("Failed")) {
                  setTimeout(() => {
                    navigate("/viewitems");
                  }, 100);
                } else {
                  // Close the modal window only
                  setSucceedMsg(""); // Reset the message to close the modal
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="parent-container">
        <div className="upload-container">
          <form
            onSubmit={handleUpload}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
              // value={formData.imageList}
            />
            {renderImageScroll()}
            {/* <button type="button" onClick={() => document.getElementById('image-upload').click()}>Select Images</button> */}
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
            >
              <option value="便當">便當</option>
              <option value="Snack">Snack</option>
              {/* Add your categories here */}
            </select>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              min={1}
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="expirationTime">Expiration Time</label>
            <input
              id="expirationTime"
              type="datetime-local"
              name="endTime"
              value={formData.endTime.substr(0, 16)}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <button className="upload-button" name="update" type="submit">
              Update
            </button>
          </form>
            <button className="delete-button" name="delete" type="submit" onClick={setDeleteItem}>
              Delete
            </button>
        </div>
      </div>
    </>
  );
}

export default UpdateItem;
