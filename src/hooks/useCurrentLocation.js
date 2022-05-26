import { useState, useEffect } from "react";

export default function useCurrentLocation (options = {}) {
    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });
    const [error, setError] = useState('');

    const handleSuccess = (position => {
        const {latitude, longitude} = position.coords;

        setLocation({
            lat: latitude,
            lng: longitude
        })
    });

    const handleError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        const { geolocation } = navigator;

        if (!geolocation) {
            setError("Geolocation is not supported.");
            return;
        }

        geolocation.getCurrentPosition(handleSuccess, handleError, options);

    }, [options]);

    return {location, error};
}