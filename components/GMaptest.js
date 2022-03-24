import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

const triangleCoords = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 }
];

function Map(props) {
  const {zoom,center} = props;
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}
    >
      <Polygon
        path={triangleCoords}
        key={1}
        editable={true}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        }}
      />

      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {editable:true}
        }}
      />
    </GoogleMap>
  );
}

export default function withGoogleMap(Map) {
    return (
        <RegularMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY"
          loadingElement={<div style={ loadingElementStyle } />}
          containerElement={<div style={ containerElementStyle } />}
          mapElement={<div style={ mapElementStyle } />}
        />
        
    );  
}