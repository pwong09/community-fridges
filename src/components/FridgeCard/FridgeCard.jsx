import React, { useState } from "react";
import { Card, Icon, Image, Button, Header, Form } from 'semantic-ui-react'
import Comment from "../../components/Comment/Comment";

export default function FridgeCard({
    updateStock, 
    fridge, 
    removeFridge, 
    user, 
    handleAddComment,
    handleDeleteComment
}) {

    const [state, setState] = useState({
        isStocked: false,
    });

    const handleSelect = (e, value ) => setState({ [value.name]: value.value })

    const handleSubmit = (value) => {
        // console.log(value, 'handle check submit')
        updateStock(fridge._id, state)
    }

    let clickHandler = null;
    if (user) {
        clickHandler = fridge.user === user._id ? () => removeFridge(fridge._id) : null;
    }
    


    return (
        <Card id={fridge.name}>
            {user && user._id === fridge.user ? 
            <Card.Header textAlign='right'>
                    <Icon name='trash' onClick={clickHandler} />
            </Card.Header>
            : ""
            }
            <Image size='tiny' src={fridge.imageUrl} ui={false} />
            <Card.Content>
                <Card.Description>
                <Header>{fridge.name}</Header>
                {fridge.streetAddress}
                <br />
                {fridge.stateOrProvince}, {fridge.country}
                <br/>
                <br />
                {fridge.hasFridge ? 'We have a fridge' : 'No fridge'}
                <br />
                {fridge.hasPantry ? 'We have pantry space' : 'No pantry'}
                <br />
                {fridge.hasFreezer ? 'We have freezer space' : 'No freezer'}
                <br />
                {fridge.isStocked ? 'Stocked! :)' : 'Not stocked. :('}
                <br />
                <br />
                {user ?
                <>
                    {/* this form toggles isStocked */}
                    Is the fridge stocked?
                    <Form onSubmit={handleSubmit}>
                        <Form.Select
                            name='isStocked'
                            options={[
                                {key: 'Y', text: 'Yes', value: 'true'},
                                {key: 'N', text: 'No', value: 'false'}
                            ]}
                            onChange={handleSelect}
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                    </>
                : "" }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {fridge.donationUrl === '' ? null : 
                <Button as='a' href={fridge.donationUrl} target="_blank" basic color="green">Donate</Button>
                }
                {fridge.websiteUrl === '' ? null : 
                <Button as='a' href={fridge.websiteUrl} target="_blank" basic color="blue">Learn More</Button>
                }
            </Card.Content>
            <Comment 
                user={user}
                fridge={fridge}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
            />
        </Card>
    )
}