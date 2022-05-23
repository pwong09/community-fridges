import React from "react";
import { Card, Icon, Image, Button } from 'semantic-ui-react'

export default function FridgeCard({fridge, removeFridge, user}) {
    // console.log(fridge.user, 'FridgeCard')
    let clickHandler = null;
    if (user) {
        clickHandler = fridge.user === user._id ? () => removeFridge(fridge._id) : null;
    }
    return (
        <Card>
            {user && user._id === fridge.user ? 
            <Card.Header textAlign='right'>
                    <Icon name='trash' onClick={clickHandler} />
            </Card.Header>
            : ""
            }
            <Image src={fridge.imageUrl} wrapped ui={false} />
            <Card.Content>
                <Card.Description>
                {fridge.streetAddress}
                <br />
                {fridge.stateOrProvince}, {fridge.country}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='a' href="https://www.google.com" target="_blank" basic color="green">Donate</Button>
                <Button basic color="blue">More Info</Button>
            </Card.Content>
        </Card>
    )
}