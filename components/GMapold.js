import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const defaultCenter = { lat: 14.069183, lng: 100.607452 };

const defaultOptions = { scrollwheel: true };

const RegularMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={props.areas && props.areas[0] ? {lat: props.areas[0].farmlat, lng: props.areas[0].farmlng}:defaultCenter}
      defaultOptions={defaultOptions}
    >
      

      {props.areas.map(area => <Marker key={area} label={area.farmname} position={{lat: area.farmlat, lng: area.farmlng}} />)}
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: "150px", width: "150px" };
const containerElementStyle = { height: "400px", width: "1400px" };
const mapElementStyle = { height: "100%" };

export default function GoogleMaps(props) {
  return (
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY"
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
      {...props}
    />
  );
}
