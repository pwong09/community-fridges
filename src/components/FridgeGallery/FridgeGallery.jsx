import React from "react";
import {Card, Segment, Dimmer, Image} from 'semantic-ui-react'
import FridgeCard from "../../components/FridgeCard/FridgeCard";
import Loading from "../../components/Loader/Loader";

export default function FridgeGallery({fridges, removeFridge, user, loading, itemsPerRow}) {

    const list = fridges.map((fridge, index) => {
        return (
            <FridgeCard 
            fridge={fridge}
            key={index}
            removeFridge={removeFridge}
            user={user}
            />
        )
    })

    return (
        <Card.Group centered itemsPerRow={itemsPerRow}>
        {loading ? (
            <Segment>
                <Dimmer active inverted>
                    <Loading size="small">
                        Loading
                    </Loading>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
        ) : null}
            {list}
        </Card.Group>
    )
}