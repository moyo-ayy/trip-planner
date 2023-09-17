import React, { useState, useEffect, useCallback, useContext } from 'react';
import './map.css'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import LocationContext from "../../contexts/LocationContext";  // Ensure the correct path
import axios from 'axios';

const center = {
  lat: 26.1420358,
  lng: -81.7948103
};

function MapComponent() {

  const { locationData } = useContext(LocationContext);  // Extracting the context data
  console.log(locationData);

  // Parse the serverResponse from context to extract lat-long coordinates
  const coordinates = locationData.serverResponse
    .split("),(")
    .map(coordStr => {
      const [lat, lng] = coordStr.replace(/[()]/g, "").split(",");
      console.log(lat, lng);
      return { lat: parseFloat(lat.trim()), lng: parseFloat(lng.trim()) };
    });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      zoom={10}
      mapContainerClassName={"mapContainer"}
      center={center}
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
