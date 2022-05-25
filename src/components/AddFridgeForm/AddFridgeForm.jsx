import React, { useState } from "react";
import { Button, Form, Segment } from 'semantic-ui-react';
import options from "../data/data";


export default function AddFridgeForm(props) {
    const [selectedFile, setSelectedFile] = useState('');
    // const [invert, setInvert] = useState(false);
    const [state, setState] = useState({
        name: '',
        owner: '',
        streetAddress: '',
        stateOrProvince: '',
        city: '',
        country: '',
        donationUrl: '',
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    const handleSelect = (e, value ) => setState({ ...state, [value.name]: value.value })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = await new FormData();

            formData.append('photo', selectedFile);
            for (let fieldName in state) {
                console.log('fieldname log', fieldName, state[fieldName]);
                formData.append(fieldName, state[fieldName]);
            }
            props.handleAddFridge(formData);
        } catch(err) {
            console.log(err, 'from addFridgeForm handleSubmit')
        }
    }

    return (
        <Form autoComplete="off" onSubmit={handleSubmit} >
        <Segment>
                <Form.Group>
                <Form.Input 
                    className="form-control"
                    type='text'
                    label='Fridge Name'
                    placeholder='name of your fridge' 
                    name='name'
                    value={state.name}
                    onChange={handleChange}
                />
                <Form.Input 
                    className="form-control"
                    type='text'
                    label='Organizer(s)'
                    placeholder='organizer(s) / group' 
                    name='owner'
                    value={state.owner}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Input 
                    className="form-control"
                    type='text'
                    label='Street Address' 
                    placeholder='street address'
                    name='streetAddress'
                    value={state.streetAddress}
                    onChange={handleChange}
                    required
                />
                <Form.Group widths={2}>
                    <Form.Input 
                        className="form-control"
                        type='text'
                        label='City' 
                        placeholder='city / town'
                        name='city'
                        value={state.city}
                        onChange={handleChange}
                        required
                    />
                    <Form.Select
                        fluid
                        label='State/Province'
                        placeholder=''
                        options={options}
                        name='stateOrProvince'
                        onChange={handleSelect}
                        required
                        />
                    <Form.Select
                        fluid
                        label='Country'
                        placeholder='country'
                        name='country'
                        options={[
                            {key: 'CA', text: 'Canada', value: 'Canada'},
                            {key: 'US', text: 'USA', value: 'USA'}
                        ]}
                        onChange={handleSelect}
                    />
                </Form.Group>
                <Form.Input
                        label='Donation Link'
                        placeholder='www.donate.com'
                        name='donationUrl'
                        value={state.donationUrl}
                        onChange={handleChange}
                    />
                <br />
                {/* <Form.Group inline>
                <label>Does your fridge have...</label>
                <Form.Checkbox
                label='Fridge'
                name='hasFridge'
                onChange={() => {
                    setInvert(!invert)
                }}
                checked={invert}
                />
                <Form.Checkbox
                label='Pantry Space'
                name='hasPantry'
                />
                <Form.Checkbox
                label='Freezer Space'
                name='hasFreezer'
                />
                </Form.Group> */}
                <Form.Group>
                    <Form.Input
                    label='Share an image of your fridge! Must be in jpg format.'
                    className="form-control"
                    type="file"
                    name="photo"
                    placeholder="upload image"
                    onChange={handleFileInput}
                    required
                    />  
                </Form.Group>
                <br />
                <Button 
                    type="submit" 
                    className="btn"
                    color="blue"
                >
                    Add Fridge
                </Button>
                </Segment>
            </Form>
    )
}