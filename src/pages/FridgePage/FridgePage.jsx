import React, {useState, useEffect} from "react";
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import AddFridgeForm from "../../components/AddFridgeForm/AddFridgeFrom";

import { Grid } from 'semantic-ui-react';

import * as fridgesAPI from "../../utils/fridgeApi";

export default function FridgePage({user}) {
    const [fridges, setFridges] = useState([]);

    const getFridges = async () => {
        try {
            const data = await fridgesAPI.getAll();
            setFridges([...data.fridges]);
        } catch(err) {
            console.log(err, 'getting fridges to render')
        }
    }    

    useEffect(() => {
        getFridges();
    }, [])

    const handleAddFridge = async (fridge) => {
        try {
            const data = await fridgesAPI.create(fridge);
            setFridges(fridges => [data.fridge, ...fridges]);
            console.log(fridges);
        } catch(err) {
            console.log(err, 'from handleAddFridge')
        }
    }


    return (
        <Grid centered>
            <Grid.Row>
                {user ? 
                <AddFridgeForm handleAddFridge={handleAddFridge} />

                : null}
            </Grid.Row>
            <Grid.Row>
                <FridgeGallery 
                    fridges={fridges} 
                />
            </Grid.Row>
        </Grid>
    )
}