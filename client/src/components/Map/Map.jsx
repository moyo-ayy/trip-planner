import React, { useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import Rating from '@mui/material/Rating';
import './map.css';

const MapComponent = ({ center, zoom, value }) => {
    
    const isMobile = useMediaQuery('(max-width:600px)');
    const mapRef = useRef(null);
    const mapsRef = useRef(null);
  
    const handleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
    };

    useEffect(() => {
      if (mapRef.current && mapsRef.current) {
          const miamiLatLng = { lat: 25.7617, lng: -80.1918 };  // Miami's coordinates
          new mapsRef.current.Marker({
              position: miamiLatLng,
              map: mapRef.current,
              title: "Miami!",
          });
      }
  }, [mapRef.current, mapsRef.current]);
  
    return (
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals
        >
          {/* You can add child components here which will act as markers */}
        </GoogleMapReact>
        {isMobile ? (
          <Paper className="paper">
            <Typography variant="h4" component="h4">
              Map Information
            </Typography>
            <Rating name="read-only" value={value} readOnly />
          </Paper>
        ) : null}
      </div>
    );
};

MapComponent.defaultProps = {
    center: {
        lat: 25.907,
        lng: -80.138,
    },
    zoom: 11,
};

export default MapComponent;
