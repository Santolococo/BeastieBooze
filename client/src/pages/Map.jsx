import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from  'react-google-maps'; 

//in order for map to render propeerly in app, it needs to be wrapped by a couple other functions. instead of adding a  couple of high order components, see implementation at ****
const Map = () => {
  return (
    <div style={{
       width: '100vw',
       height: '100vh'}}>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{lat:29.951065, lng:-90.071533}}/>
    </div>
  )
}

//**** 
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
