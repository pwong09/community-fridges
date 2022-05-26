import React, {useState, useEffect} from "react";
import { Card, Icon, Image, Button, Header, Form, Comment } from 'semantic-ui-react'

export default function FridgeCard({
    updateStock, 
    fridge, 
    removeFridge, 
    user, 
    handleNewComment, 
    removeComment}) {
    // console.log(fridge.comments, "comments if any")
    const [state, setState] = useState({
        isStocked: false,
    });
    const [comments, setComments] = useState({
        comment: ''
    });

    const commentsList = fridge.comments.map((comment, index) => {
        console.log(typeof(comment.createdAt))
        let commentHandler = null;
        if (user) {
            commentHandler = comment.user === user._id ? () => removeComment(comment._id) : null;
        }
        return (
            <Comment key={index}>
                <Comment.Content>
                    {comment.createdAt.slice(0, 10)} <strong>{comment.username} said:</strong> {comment.comment}
                {user && user._id === comment.user ?   
                    <Icon name='trash' onClick={commentHandler} />
                : null }  
                </Comment.Content>
            </Comment>
        )
    })

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

    // console.log(fridge, 'FridgeCard')
    let clickHandler = null;
    if (user) {
        clickHandler = fridge.user === user._id ? () => removeFridge(fridge._id) : null;
    }
    

    const handleChange = (e) => {
        // console.log(e.target.value, 'handleChange')
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
                Stocked: {fridge.isStocked ? 'Yes' : 'Nope'}
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
                {fridge.website === '' ? null : 
                <Button as='a' href={fridge.website} target="_blank" basic color="blue">Learn More</Button>
                }
            </Card.Content>
            <Card.Content>
                <Header as='h5'>Fridge status updates:</Header>
                {commentsList.length > 0 ? commentsList : "If you're logged in you can add an update!"}
            </Card.Content>
            {user ? 
            <Card.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.TextArea 
                        type="text"
                        name="comment"
                        placeholder="let us know what's going on at this fridge!"
                        value={state.comment}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Content>
            : "" }
        </Card>
    )
}