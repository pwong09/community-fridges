import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";



export default function Map({ location, zoomLevel }) {
    const apiKey = process.env.REACT_APP_MAPS_API
    const defaultProps = {
        center: {
            lat: 40.730610,
            lng: -73.935242
        },
        zoom: 9
    }
        
    return (
    <div className="map">
        <h2 className="map-h2">Vist Google's Campus</h2>

        <div className="google-map" style={{ height: '50vh', width: '50vh'}}>
            <GoogleMapReact
                // object that holds API key
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            <LocationPin
                lat={40.7413283}
                lng={-74.0333512}
                text={'willow'}
            />
            <LocationPin 
                lat={40.74444769999}
                lng={-73.7547925}
                text={'springfield'}
            />
            </GoogleMapReact>
        </div>
    </div>
    )
}