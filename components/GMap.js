import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";




const defaultCenter = { lat: 14.069183, lng: 100.607452 };

const defaultOptions = { scrollwheel: true };

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={ defaultCenter }
      defaultOptions={ defaultOptions }
    >
      <Marker position={ defaultCenter } />
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: '150px',width: '150px' };
const containerElementStyle = { height: '580px', width: '900px'};
const mapElementStyle = { height: '100%' };

export default function GoogleMaps(){
    return (
      <RegularMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY"
        loadingElement={<div style={ loadingElementStyle } />}
        containerElement={<div style={ containerElementStyle } />}
        mapElement={<div style={ mapElementStyle } />}
      />

      
    );  
  }