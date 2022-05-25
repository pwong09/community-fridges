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
            <Grid.Row>
                <Map 
                    fridges={fridges}
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