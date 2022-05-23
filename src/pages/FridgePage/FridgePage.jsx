import React, {useState, useEffect} from "react";
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import AddFridgeForm from "../../components/AddFridgeForm/AddFridgeForm";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Grid } from 'semantic-ui-react';

import * as fridgesAPI from "../../utils/fridgeApi";

export default function FridgePage({user}) {
    const [fridges, setFridges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const key = process.env.REACT_APP_GOOGLE_EMBED_API;
    // let map;

    // function initMap() {
    //     map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 8,
    //     });
    // }
    
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
        initMap();
    }, [])

    const handleAddFridge = async (fridge) => {
        try {
            const data = await fridgesAPI.create(fridge);
            setFridges(fridges => [data.fridge, ...fridges]);
            // console.log(fridges);
            setLoading(false);
        } catch(err) {
            console.log(err, 'from handleAddFridge');
            setError(err);
        }
    }

    const removeFridge = async (fridgeId) => {
        try {
            const data = await fridgesAPI.removeFridge(fridgeId);
            getFridges();
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
            <Grid.Row>
                {user ? 
                <AddFridgeForm handleAddFridge={handleAddFridge} />
                : null}
            </Grid.Row>
            <Grid.Row>
            <iframe title="googleMap" 
            src={`https://www.google.com/maps/embed/v1/search?key=${key}&q=community+fridge+in+Vancouver`}
            width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Grid.Row>
            <Grid.Row>
                <div id='map'></div>
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