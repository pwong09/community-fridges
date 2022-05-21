import React, { useState } from "react";
import { Button, Form, Segment, Checkbox } from 'semantic-ui-react';

export default function AddFridgeForm(props) {
    const [selectedFile, setSelectedFile] = useState('');
    const [state, setState] = useState({});

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('caption', state.caption);
        props.handleAddFridge(formData);
    }

    return (
        <Segment inverted>
            <Form inverted autoComplete="off" onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Input 
                        fluid 
                        label='Street Address' 
                        placeholder='street address'
                        name='streetAddress'
                    />
                    <Form.Select 
                        fluid
                        label='State'
                        placeholder='State'
                    />
                </Form.Group>
                <Form.Group inline>
                <label>Does your fridge have...</label>
                <Form.Field
                control={Checkbox}
                label='Fridge'
                name='hasFridge'
                />
                <Form.Field
                control={Checkbox}
                label='Pantry Space'
                name='hasPantry'
                />
                <Form.Field
                control={Checkbox}
                label='Freezer Space'
                name='hasFreezer'
                />
                </Form.Group>
                <Form.Group>
                    <label>Share an image of your fridge!</label>
                    <Form.Input
                    className="form-control"
                    type="file"
                    name="photo"
                    placeholder="upload image"
                    onChange={handleFileInput}
                    />  
                </Form.Group>
                <Button 
                    type="submit" 
                    className="btn"
                    color="secondary"
                >
                    Add Fridge
                </Button>
            </Form>
        </Segment>
    )
}