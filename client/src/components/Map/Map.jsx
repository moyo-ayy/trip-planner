import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import Rating from '@mui/material/Rating';
import './map.css';

const MapComponent = ({ center, zoom, value }) => {
    
    const isMobile = useMediaQuery('(max-width:600px)');
  
    const renderMarkers = (map, maps) => {
      // You can add markers here using the map and maps objects
    };
  
    return (
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY}}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
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
      lat: 80.95,
      lng: 100.33,
    },
    zoom: 11,
  };
  
  export default MapComponent;
