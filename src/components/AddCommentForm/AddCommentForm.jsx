import React, {useState} from "react";
import { Button, Form } from 'semantic-ui-react';

export default function AddComment({user, handleAddComment, fridge}) {
    const [state, setState] = useState({
        comment: ''
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(state)
        handleAddComment(fridge._id, state);
        // console.log('submit clicked!');
        setState({comment: ''})
    }

    return (
        <>
        {user ? 
        <Form onSubmit={handleSubmit}>
            <Form.Input
                type="text"
                name="comment"
                onChange={handleChange}
                value={state.comment}
                required
            />
            <Button 
                content='Comment' 
                primary 
                type="submit"
            />
        </Form>
        : ""}
    </>
    )
}