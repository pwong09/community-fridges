import React from "react";
import {Card} from 'semantic-ui-react'
import FridgeCard from "../../components/FridgeCard/FridgeCard";

export default function FridgeGallery(props) {
    return (
        <Card.Group>
            <FridgeCard />
        </Card.Group>
    )
}