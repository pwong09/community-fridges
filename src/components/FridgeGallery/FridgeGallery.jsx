import React from "react";
import {Card} from 'semantic-ui-react'
import FridgeCard from "../../components/FridgeCard/FridgeCard";

export default function FridgeGallery({fridges}) {

    const list = fridges.map((fridge, index) => {
        return (
            <FridgeCard 
            fridge={fridge}
            key={index}
            />
        )
    })

    return (
        <Card.Group>
            {list}
        </Card.Group>
    )
}