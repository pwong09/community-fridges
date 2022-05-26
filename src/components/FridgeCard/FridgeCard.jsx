import React, {useState, useEffect} from "react";
import { Card, Icon, Image, Button, Header, Form } from 'semantic-ui-react'
import {Link} from "react-router-dom"


export default function FridgeCard({updateStock, fridge, removeFridge, user, handleNewComment}) {
    // console.log(fridge.comments, "comments if any")
    const [state, setState] = useState({
        isStocked: false,
    });
    const [comments, setComments] = useState({
        comment: ''
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

    useEffect(() => {
        console.log(state);
    },[setState])

    // console.log(fridge, 'FridgeCard')
    let clickHandler = null;
    if (user) {
        clickHandler = fridge.user === user._id ? () => removeFridge(fridge._id) : null;
    }

    const handleChange = (e) => {
        console.log(e.target.value, 'handleChange')
        setComments({
            ...comments,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log('I am submitting!')
        handleNewComment(fridge._id, comments);
        // console.log(comment);
    }
    return (
        <Card>
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
                Fridge: {fridge.hasFridge ? 'Yes' : 'Nope'}
                <br />
                Pantry: {fridge.hasPantry ? 'Yes' : 'Nope'}
                <br />
                Freezer: {fridge.hasFreezer ? 'Yes' : 'Nope'}
                <br />
                <Form onSubmit={handleCheck}>
                <Form.Input
                    type='checkbox'
                    label='Stocked?'
                    name='isStocked'
                    value={state.isStocked}
                    onClick={handleCheck}
                />
                </Form>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {fridge.donationUrl === '' ? null : 
                <Button as='a' href={fridge.donationUrl} target="_blank" basic color="green">Donate</Button>
                }
                <Button basic color="blue">More Info</Button>
            </Card.Content>
            <Card.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.TextArea 
                        type="text"
                        name="comment"
                        value={state.comment}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Content>
        </Card>
    )
}