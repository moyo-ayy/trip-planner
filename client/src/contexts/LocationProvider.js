import React, { useState, useEffect } from "react";
import LocationContext from "./LocationContext";

const LocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({
    formData: null,
    serverResponse: null,
    tripPlan: null,
  });

  useEffect(() => {
    // Load data from local storage on mount
    const cachedData = localStorage.getItem("locationData");
    if (cachedData) {
      setLocationData(JSON.parse(cachedData));
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("locationData", JSON.stringify(locationData));
  }, [locationData]);

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
