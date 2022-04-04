import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polygon
  } from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

const defaultCenter = { lat: 14.069183, lng: 100.607452 };

const record = 
[
  
];

const RegularMap = withScriptjs(
  withGoogleMap(props => 
    (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={ defaultCenter }
    >
    
    <Polygon
        path={record}
        editable={true}
        geodesic={true}
        options=
        {{
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
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
          polygonOptions: {editable:true}
        },
      }}
    />

    </GoogleMap>

  ))
);



const loadingElementStyle = { height: '150px',width: '150px' };
const containerElementStyle = { height: '580px', width: '900px'};
const mapElementStyle = { height: '100%' };

export default function GoogleMaps(){
    return (
      <RegularMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY&libraries=geometry,drawing,places"
        loadingElement={<div style={ loadingElementStyle } />}
        containerElement={<div style={ containerElementStyle } />}
        mapElement={<div style={ mapElementStyle } />}
      />
      
    );  
  }