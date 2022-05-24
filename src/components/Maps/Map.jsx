import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";

const apiKey = process.env.REACT_APP_MAPS_API

export default function Map({ location, zoomLevel }) {
    return (
    <div className="map">
        <h2 className="map-h2">Vist Google's Campus</h2>

        <div className="google-map" style={{ height: '50vh', width: '50vh'}}>
            <GoogleMapReact
                // object that holds API key
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
            <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
            />
            </GoogleMapReact>
        </div>
    </div>
    )
}