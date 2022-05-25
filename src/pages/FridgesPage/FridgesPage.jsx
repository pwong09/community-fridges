import React, {useState, useEffect} from "react";
import { Grid } from 'semantic-ui-react';
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Map from "../../components/Maps/Map";
import * as fridgesAPI from "../../utils/fridgeApi";

export default function FridgesPage({user}) {
    const [fridges, setFridges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = {
        address: '1600 Amphitheatre Parkway',
        lat: 37.42216,
        lng: -122.08427,
    }

    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

    const getLocation = async () => {
        const key = process.env.REACT_APP_GEO_API
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=${key}`)
            console.log(res)
            const data = await res.json();
            console.log(data.results[0].geometry.location) // <-- returns object with lat and lng properties
        } catch(err) {
            console.log(err, 'from getLocation')
            setError(err);
        }
    }

    // getLocation();

    const getFridges = async () => {
        try {
            const data = await fridgesAPI.getAll();
            setFridges([...data.fridges]);
            setLoading(false);
        } catch(err) {
            console.log(err, 'getting fridges to render');
            setError(err);
        }
    }    

    useEffect(() => {
        getFridges();
    }, [])


    const handleAddFridge = async (fridge) => {
        try {
            const data = await fridgesAPI.create(fridge);
            setFridges(fridges => [data.fridge, ...fridges]);
            // console.log(fridges);
            setLoading(false);
            getFridges();
        } catch(err) {
            console.log(err, 'from handleAddFridge');
            setError(err);
        }
    }

    const removeFridge = async (fridgeId) => {
        try {
            const data = await fridgesAPI.removeFridge(fridgeId);
            const fridgeArray = await fridges.filter(fridge => fridge._id !== fridgeId);
            setFridges(fridgeArray);
        } catch(err) {
            console.log(err, "error from removeFridge")
            setError(err);
        }
    }

    if (error) {
        return (
            <>
                <ErrorMessage error={error} />
            </>
        )
    }

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <Grid centered>
            {/* <Grid.Row>
                {user ? 
                <AddFridgeForm handleAddFridge={handleAddFridge} />
                : null}
            </Grid.Row> */}
            <Grid.Row>
                <Map 
                    location={location} 
                    zoomLevel={11}
                />
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <FridgeGallery 
                        fridges={fridges} 
                        removeFridge={removeFridge}
                        user={user}
                        loading={loading}
                        itemsPerRow={2}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}