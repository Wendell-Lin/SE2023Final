//Map.js
import React, { useRef, useEffect, useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import userService from '../services/userService';
import { Cookies, useCookies } from 'react-cookie';

const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Error loading map</p>;
  return null;
};

const MyMapComponent = ({ 
  items,
  savedItemIds,
  setSavedItemIds,
  setItemList,
  Popup,
}) => {
  const ref = useRef();
  const center = {
    lat: 25.0179635829881,
    lng: 121.53970252967439
  };
  const zoom = 16;

  const [selectedItem, setSelectedItem] = useState(null);
  const [mapSavedItems, setMapSetItems] = useState(new Set());
  const [cookies] = useCookies();

  const handleOpenPopup = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
      setSelectedItem(null);
  };
  const calculateAndDisplayRoute = (directionsService, directionsRenderer, start, end) => {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, { center, zoom });
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add markers to the map
    items.forEach(item => {
        if (item.latitude && item.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) },
            map: map,
            title: item.name,
        });
        marker.addListener('click', () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              const markerLocation = { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) };
  
              calculateAndDisplayRoute(directionsService, directionsRenderer, userLocation, markerLocation);
            }, () => {
              getSaveIds(item);
            });
          } else {
            getSaveIds(item);
          }
        });
      }
    });

  }, [items]);

  const getSaveIds = async (item) => {
    try {
        const response = await userService.getFollow(cookies);
        const followedItems = response.items || [];
        const followedIds = new Set(followedItems.map(item => item.id));
        console.log(followedIds)
        setSavedItemIds(followedIds);
        // item.saved = savedItemIds.has(item.id);
        console.log(savedItemIds);
        console.log(item.id);
        item.saved = followedIds.has(item.id);
        item.itemId = item.id;
        setSelectedItem(item);
        handleOpenPopup(item);
    } catch (error) {
        console.error("Error fetching followed items:", error);
        // Handle error appropriately
    }
  }
  const toggleSaved = async (itemId) => {
    const originallySaved = savedItemIds.has(itemId);
    console.log(itemId);
    console.log(savedItemIds);
    setSavedItemIds(prevSavedItemIds => {
        const newSavedItemIds = new Set(prevSavedItemIds);
        if (originallySaved) {
            newSavedItemIds.delete(itemId);
        } else {
            newSavedItemIds.add(itemId);
        }
        return newSavedItemIds;
    });
    setSelectedItem(prevSelectedItem=>({
      ...prevSelectedItem,
      saved: !originallySaved,
    }));
    
    // Attempt to update the server
    try {
        await userService.followItem(itemId, !originallySaved, cookies);
    } catch (e) {
        console.error("Error toggling save status:", e);

        // Revert the UI changes if the server update fails
        setSavedItemIds(prevSavedItemIds => {
            const revertedSavedItemIds = new Set(prevSavedItemIds);
            if (originallySaved) {
                revertedSavedItemIds.add(itemId);
            } else {
                revertedSavedItemIds.delete(itemId);
            }
            return revertedSavedItemIds;
        });

    }
  };

  return (<>
    <div ref={ref} style={{ width: "100%", height: "100%" }} />;
    {selectedItem && (
        <Popup 
          item={selectedItem}
          onClose={handleClosePopup} 
          onToggleSaved={() => toggleSaved(selectedItem.id)}
      />
    )}
  </>)
};

const Map = ({ items, Popup, setSavedItemIds, savedItemIds}) => {
  return (
    <Wrapper apiKey={"AIzaSyAYcGCwr9AKIJWiDBnyr9wW6_XezNCLslg"} render={render}>
      <MyMapComponent 
      items={items} 
      setSavedItemIds={setSavedItemIds} 
      savedItemIds={savedItemIds}
      Popup={Popup}
      />
    </Wrapper>
  );
};

export default Map;
