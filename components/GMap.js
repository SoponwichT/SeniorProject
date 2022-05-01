import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon,
  Marker,
  InfoWindow
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


function getPaths(polygon) {

  var polygonBounds = polygon.getPath();
  var bounds = [];
  for (var i = 0; i < polygonBounds.length; i++) {
    var point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng()
    };
    bounds.push(point);
  }
  console.log(bounds);
  return bounds
}

const RegularMap = withScriptjs(
  withGoogleMap(props =>
  (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: props.defaultCentre ? Number(props.defaultCentre.lat) : 14.069183,
        lng: props.defaultCentre ? Number(props.defaultCentre.lng) : 100.607452,
      }}
      onClick={ev => {
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
      }}
    >

      <DrawingManager
        drawingMode={"polygon"}
        onPolygonComplete={value => console.log(getPaths(value))}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {
            fillColor: "#199ee0",
            fillOpacity: 0.2,
            strokeWeight: 2,
            strokeColor: "#113460",
            clickable: true,
            editable: true,
            geodesic: false,
            visible: true,
            zIndex: 1
          }
        }}
      />


      <Marker
        label={"Farm01"}
        position={{
          lat: props.defaultCentre ? Number(props.defaultCentre.lat) : 14.069183,
          lng: props.defaultCentre ? Number(props.defaultCentre.lng) : 100.607452,
        }}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <FaAnchor />
        </InfoWindow>}
      </Marker>

    </GoogleMap>

  ))
);



const loadingElementStyle = { height: '150px', width: '150px' };
const containerElementStyle = { height: '510px', width: '600px' };
const mapElementStyle = { height: '100%' };

export default function GoogleMaps() {

  return (
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}

    />


  );
}