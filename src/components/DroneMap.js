import React, { Component } from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const DroneGoogleMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyChUL75pwfm2xfJxmrIMxiahma0_RJHu0k",
    containerElement: <div style={{ height: `400px` }} />,
    loadingElement: <div style = {{ height: `100%`, position: 'relative', overflow: 'hidden' }} />,
    mapElement: <div style = {{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap 
    defaultZoom={4}
    defaultCenter={{ lat: 29.7604, lng: -95.3698 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.markerLatitude, lng: props.markerLongitude }}
      />
    )}
  </GoogleMap>
));

class DroneMap extends Component {
  render() {

    const {
      markerLatitude,
      markerLongitude
    } = this.props;

    return (
      <DroneGoogleMap
        isMarkerShown={markerLatitude !== null ? true : false}
        markerLatitude={markerLatitude}
        markerLongitude={markerLongitude}
      />      
    );
  }
}

export default DroneMap