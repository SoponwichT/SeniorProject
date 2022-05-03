import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

function getPaths(polygon) {
  var polygonBounds = polygon.getPath();
  var bounds = [];
  for (var i = 0; i < polygonBounds.length; i++) {
    var point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }
  console.log(bounds);
  return bounds;
}

const RegularMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 14.069183, lng: 100.607452 }}
      onClick={(e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        props.setLatcoord(lat);
        props.setLngcoord(lng);
      }}
    >
      <Marker position={{ lat: Number(props.lat), lng: Number(props.lng) }} />
      <Polygon paths={props.area} options={{
            fillColor: "#00C897",
            fillOpacity: 0.2,
            strokeWeight: 2,
            strokeColor: "#019267",
            visible: true,
            zIndex: 1,
          }}/>

      <DrawingManager
        onPolygonComplete={(value) => {
          const area = getPaths(value);
          props.setAreacoord(Object.values(area));
        }}
        options={{
          drawingControl: props.view ?? false,
          drawingControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: "#00C897",
            fillOpacity: 0.2,
            strokeWeight: 2,
            strokeColor: "#019267",
            clickable: true,
            editable: true,
            draggable: true,
            geodesic: false,
            visible: true,
            zIndex: 1,
          },
        }}
      />
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: "150px", width: "150px" };
const containerElementStyle = { height: "510px", width: "600px" };
const mapElementStyle = { height: "100%" };

export default function GoogleMaps(props) {
  return (
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: "150px", width: "150px" }} />}
      containerElement={<div style={{ height: "510px", width: "600px" }} />}
      mapElement={<div style={{ height: "100%" }} />}
      {...props}
    />
  );
}
