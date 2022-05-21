import React from "react";
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import AddFridgeForm from "../../components/AddFridgeForm/AddFridgeFrom";

import { Grid } from 'semantic-ui-react';

export default function FridgePage(props) {
    return (
        <Grid centered>
            <Grid.Row>
                <AddFridgeForm />
            </Grid.Row>
            <Grid.Row>
                <FridgeGallery />
            </Grid.Row>
        </Grid>
    )
}