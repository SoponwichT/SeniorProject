import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const defaultCenter = { lat: 14.069183, lng: 100.607452 };
const defaultCenter2 = { lat: 14.079183, lng: 100.507452 };

const defaultOptions = { scrollwheel: true };

const places = [
  {
    name: "Farm01",
    title: "farm1",
    lat: 14.069183,
    lng: 100.607452,
    id: 1,
  },
  {
    name: "farm02",
    title: "farm2",
    lat: 14.079183,
    lng: 100.607452,
    id: 2,
  },
];

const RegularMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      <Marker label={"Farm01"} position={defaultCenter} />
      <Marker label={"Farm02"} position={defaultCenter2} />
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: "150px", width: "150px" };
const containerElementStyle = { height: "400px", width: "1400px" };
const mapElementStyle = { height: "100%" };

export default function GoogleMaps() {
  return (
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY"
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
