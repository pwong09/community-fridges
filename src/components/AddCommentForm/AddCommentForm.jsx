import React, {useState} from "react";
import { Button, Form } from 'semantic-ui-react';

export default function AddComment({handleAddComment, fridge}) {
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
        console.log(state)
        handleAddComment(fridge._id, state);
        console.log('submit clicked!');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input
                type="text"
                name="comment"
                onChange={handleChange}
                required
            />
            <Button 
                content='Add Reply' 
                primary 
                type="submit"
            />
    </Form>
    )
}