import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";



export default function Map({ fridges }) {
    const apiKey = process.env.REACT_APP_MAPS_API
    const geoKey = process.env.REACT_APP_GEO_API
    const defaultProps = {
        center: { //new york city
            lat: 40.730610,
            lng: -73.935242
        },
        zoom: 12
    }
    //https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

    const getYourLocation = async () => {
        const res = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${geoKey}`)
        const data = await res.json()
        console.log(data)
    }

    // getYourLocation();

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
        <h2 className="map-h2">Fridges in NYC!</h2>

        <div className="google-map" style={{ height: '50vh', width: '50vh'}}>
            <GoogleMapReact
                // object that holds API key
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            {locations}
            </GoogleMapReact>
        </div>
    </div>
    )
}