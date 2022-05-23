import React, { useState } from "react";
import { Button, Form, Segment, Checkbox, Select } from 'semantic-ui-react';

import options from "../data/data";

export default function AddFridgeForm(props) {
    const [selectedFile, setSelectedFile] = useState('');
    const [state, setState] = useState({});

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    // const handleSelect = (e, { value }) => this.setState({ value })

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
                <Form.Input 
                    label='Organizer(s)'
                    placeholder='organizer(s) / group' 
                    name='owner'
                    value={state.owner}
                />
                <Form.Input 
                    fluid 
                    label='Street Address' 
                    placeholder='street address'
                    name='streetAddress'
                    value={state.streetAddress}
                />
                <Form.Group>
                    <Form.Field
                        control={Select}
                        fluid
                        label='State or Province'
                        placeholder='state or province'
                        options={options}
                        name='stateOrProvince'
                        value={state.stateOrProvince}
                        />
                    <Form.Field 
                        control={Select}
                        fluid
                        label='Country'
                        placeholder='country'
                        name='country'
                        value={state.country}
                        options={[
                            {key: 'CA', text: 'Canada', value: 'Canada'},
                            {key: 'US', text: 'USA', value: 'USA'}
                        ]}
                    />
                    <Form.Input
                        label='Donation Link'
                        placeholder='donation link'
                        name='donationLink'
                        value={state.donationLink}
                    />
                </Form.Group>
                <br />
                <Form.Group inline>
                <label>Does your fridge have...</label>
                <Form.Field
                control={Checkbox}
                label='Fridge'
                name='hasFridge'
                value={state.hasFridge}
                />
                <Form.Field
                control={Checkbox}
                label='Pantry Space'
                name='hasPantry'
                value={state.hasPantry}
                />
                <Form.Field
                control={Checkbox}
                label='Freezer Space'
                name='hasFreezer'
                value={state.hasPantry}
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
                <br />
                <Button 
                    type="submit" 
                    className="btn"
                    color="primary"
                >
                    Add Fridge
                </Button>
            </Form>
        </Segment>
    )
}