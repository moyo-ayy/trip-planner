import React from 'react';
import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import { Paper, Typography, useMediaQuery } from '@mui/material';
// import Rating from '@mui/material/Rating';
import './map.css'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const center = {
  lat: 26.1420358,
  lng: -81.7948103
};

function MapComponent() {

  const [backEndData,setBackEndData] = useState([{}])
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/${'Miami'}/${'Tampa'}/${6}`)
  .then(res => {
    setBackEndData(res.data)
    setIsLoading(false)
    // console.log(Buffer.from(backEndData[5].Cover.data.data).toString('base64'))
  })
  },[])



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
          <GoogleMap
          zoom={10}
          mapContainerClassName={"mapContainer"}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={{lat:26.6406,lng:-81.8723}}/>
          <Marker position={{lat:27.4989,lng:-82.5748}}/>
        </GoogleMap>
  ) : <></>
}



// const MapComponent = ({ center, zoom, value }) => {
    
//     const isMobile = useMediaQuery('(max-width:600px)');
//     const mapRef = useRef(null);
//     const mapsRef = useRef(null);
  
//     const handleApiLoaded = ({ map, maps }) => {
//         mapRef.current = map;
//         mapsRef.current = maps;
//     };

//     useEffect(() => {
//       if (mapRef.current && mapsRef.current) {
//           const miamiLatLng = { lat: 25.7617, lng: -80.1918 };  // Miami's coordinates
//           new mapsRef.current.Marker({
//               position: miamiLatLng,
//               map: mapRef.current,
//               title: "Miami!",
//           });
//       }
//   }, [mapRef.current, mapsRef.current]);
  
//     return (
//       <div className="mapContainer">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
//           defaultCenter={center}
//           defaultZoom={zoom}
//           onGoogleApiLoaded={handleApiLoaded}
//           yesIWantToUseGoogleMapApiInternals
//         >
//           {/* You can add child components here which will act as markers */}
//         </GoogleMapReact>
//         {isMobile ? (
//           <Paper className="paper">
//             <Typography variant="h4" component="h4">
//               Map Information
//             </Typography>
//             <Rating name="read-only" value={value} readOnly />
//           </Paper>
//         ) : null}
//       </div>
//     );
// };

// MapComponent.defaultProps = {
//     center: {
//         lat: 25.907,
//         lng: -80.138,
//     },
//     zoom: 11,
// };

export default MapComponent;
