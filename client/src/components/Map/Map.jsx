import React, { useState, useEffect, useCallback, useContext } from 'react';
import './map.css'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import LocationContext from "../../contexts/LocationContext";  // Ensure the correct path
import axios from 'axios';

function MapComponent() {

  const { locationData } = useContext(LocationContext);  // Extracting the context data
  console.log(locationData);

  // Improved parsing logic to handle spaces
  const coordinates = locationData.serverResponse
    .split("), (")  // Handle spaces after commas
    .map(coordStr => {
      const [lat, lng] = coordStr.replace(/[()]/g, "").split(", ");
      console.log(lat, lng);
      return { lat: parseFloat(lat.trim()), lng: parseFloat(lng.trim()) };
    });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback(function callback(map) {
    // Create bounds object
    const bounds = new window.google.maps.LatLngBounds();
    // Extend bounds for each marker
    coordinates.forEach(coord => bounds.extend(coord));
    // Adjust map view to fit all markers
    map.fitBounds(bounds);
    setMap(map);
  }, [coordinates]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      zoom={10}
      mapContainerClassName={"mapContainer"}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Generate markers based on coordinates */}
      {coordinates.map((coord, index) => (
        <Marker key={index} position={coord} />
      ))}
    </GoogleMap>
  ) : <></>
}

export default MapComponent;
