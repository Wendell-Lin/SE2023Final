//Map.js
import React, { useRef, useEffect, useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Error loading map</p>;
  return null;
};

const MyMapComponent = ({ items }) => {
  const ref = useRef();
  const center = {
    lat: 25.0179635829881,
    lng: 121.53970252967439
  };
  const zoom = 16;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    // Add markers to the map
    items.forEach(item => {
        if (item.latitude && item.longitude) {
        new window.google.maps.Marker({
            position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) },
            map: map,
            title: item.name,
        });
        }
    });

  }, [items]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

const Map = ({ items }) => {
  return (
    <Wrapper apiKey={"AIzaSyAYcGCwr9AKIJWiDBnyr9wW6_XezNCLslg"} render={render}>
      <MyMapComponent items={items} />
    </Wrapper>
  );
};

export default Map;
