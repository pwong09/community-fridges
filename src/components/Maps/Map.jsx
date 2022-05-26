import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";



export default function Map({ fridges, center, locationError }) {
    const apiKey = process.env.REACT_APP_MAPS_API
    const defaultProps = {
        center: { //new york city
            lat: 40.730610,
            lng: -73.935242
        },
        zoom: 12
    }

    const locations = fridges.map((fridge, index) => {
        return (
            <LocationPin 
            lat={fridge.lat}
            lng={fridge.lng}
            text={fridge.name}
            key={index}
            />
        )
    })
        
    return (
    <div className="map">
        <h2 className="map-h2">Fridges near you!</h2>

        <div className="google-map" style={{ height: '50vh', width: '50vh'}}>
            <GoogleMapReact
                // object that holds API key
                bootstrapURLKeys={{ key: apiKey }}
                center={center}
                defaultZoom={defaultProps.zoom}
            >
            {locations}
            </GoogleMapReact>
        </div>
    </div>
    )
}