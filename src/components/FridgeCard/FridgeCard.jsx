import React, { useState } from "react";
import { Card, Icon, Image, Button, Header, Form } from 'semantic-ui-react'
import Comment from "../../components/Comment/Comment";

export default function FridgeCard({
    updateStock, 
    fridge, 
    removeFridge, 
    user, 
    handleAddComment
}) {

    const [state, setState] = useState({
        isStocked: false,
    });

    const handleCheck = (e) => { 
        // console.log(e.target.checked, 'e.target.checked')
        // console.log(typeof(e.target.checked))
        setState({
            [e.target.name]: e.target.checked
        });
        handleCheckSubmit({[e.target.name]: e.target.checked});
    }

    const handleCheckSubmit = (value) => {
        console.log(value, 'handle check submit')
        updateStock(fridge._id, value)
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
                    {fridge.isStocked  ? (
                    <Form onSubmit={handleCheck}>
                        <Form.Group inline>
                        <label>Fridge is Empty? :(</label>
                        <Form.Input 
                            type='checkbox'
                            name='isStocked'
                            value={state.isStocked}
                            onClick={handleCheck}
                        />
                        </Form.Group>
                    </Form>
                    ) : (
                    <Form onSubmit={handleCheck}>
                        <Form.Group inline>
                            <label>Fridge is Stocked? :)</label>
                        <Form.Input
                            type='checkbox'
                            name='isStocked'
                            value={state.isStocked}
                            onClick={handleCheck}
                        />
                        </Form.Group>
                    </Form>
                    )}
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
                fridge={fridge}
                handleAddComment={handleAddComment} 
            />
        </Card>
    )
}